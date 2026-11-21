<?php
/**
 * Backend of the "Talk to Quickair Assistant" button.
 *
 * POST JSON  { "action": "chat",   "messages": [...] }  -> { "reply", "end", "dnc" }
 *            { "action": "report", "messages": [...] }  -> { "sent" }
 *
 * "messages" is the conversation so far: the assistant's opening line first,
 * then visitor and assistant turns. The server keeps no conversation state.
 * When the assistant ends a conversation, the lead report is mailed from the
 * same request; "report" exists for conversations the visitor walks away from.
 */

declare(strict_types=1);

use Anthropic\Client;
use Anthropic\Core\Exceptions\APIConnectionException;
use Anthropic\Core\Exceptions\APIStatusException;
use Anthropic\Core\Exceptions\AuthenticationException;
use Anthropic\Core\Exceptions\RateLimitException;

const PRIVATE_DIR = __DIR__ . '/private';
const FALLBACK_BETA = 'server-side-fallback-2026-07-01';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Count one hit against a limit; false when the limit is already used up. */
function allow(string $bucket, int $limit): bool
{
    $dir = PRIVATE_DIR . '/data';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return true; // cannot keep counters on this server: do not block real visitors
    }
    if (random_int(1, 200) === 1) {
        foreach (glob($dir . '/*.cnt') ?: [] as $old) {
            if (filemtime($old) < time() - 2 * 86400) {
                @unlink($old);
            }
        }
    }
    $handle = @fopen($dir . '/' . sha1($bucket) . '.cnt', 'c+');
    if ($handle === false) {
        return true;
    }
    flock($handle, LOCK_EX);
    $count = (int) stream_get_contents($handle);
    $ok = $count < $limit;
    if ($ok) {
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, (string) ($count + 1));
    }
    flock($handle, LOCK_UN);
    fclose($handle);
    return $ok;
}

/** Validate the conversation sent by the browser and shape it for the API. */
function conversation(mixed $raw, array $settings): array
{
    if (!is_array($raw) || $raw === [] || count($raw) > $settings['max_turns']) {
        respond(400, ['error' => 'bad_conversation']);
    }
    $messages = [];
    foreach (array_values($raw) as $i => $turn) {
        $role = is_array($turn) ? ($turn['role'] ?? null) : null;
        $text = is_array($turn) && is_string($turn['content'] ?? null) ? trim($turn['content']) : '';
        // The opening line is the assistant's; after that the two sides alternate.
        $expected = $i % 2 === 0 ? 'assistant' : 'user';
        if ($role !== $expected || $text === '') {
            respond(400, ['error' => 'bad_conversation']);
        }
        if ($role === 'user' && mb_strlen($text) > $settings['max_chars']) {
            respond(400, ['error' => 'message_too_long']);
        }
        if (mb_strlen($text) > 2000) {
            respond(400, ['error' => 'bad_conversation']);
        }
        $messages[] = ['role' => $role, 'content' => $text];
    }
    // The API needs a visitor turn first; this stands in for the button click.
    array_unshift($messages, ['role' => 'user', 'content' => '(The visitor clicked the talk button.)']);
    return $messages;
}

function textOf(object $message): string
{
    $text = '';
    foreach ($message->content as $block) {
        if ($block->type === 'text') {
            $text .= $block->text;
        }
    }
    return trim($text);
}

function transcript(array $messages): string
{
    $lines = [];
    foreach (array_slice($messages, 1) as $turn) {
        $lines[] = ($turn['role'] === 'user' ? 'Visitor: ' : 'Assistant: ') . $turn['content'];
    }
    return implode("\n", $lines);
}

/** Ask the model to turn the conversation into the lead record the sales team reads. */
function leadRecord(Client $client, array $settings, string $transcript): ?array
{
    $text = ['type' => 'string'];
    $message = $client->beta->messages->create(
        model: $settings['model'],
        maxTokens: 4000,
        betas: [FALLBACK_BETA],
        fallbacks: 'default',
        system: 'You file sales leads for Quickair, a maker of aluminium compressed air piping. '
            . 'Read the conversation between the website AI assistant and a visitor and fill in the record in English. '
            . 'Use only what the visitor said. Leave a field as an empty string when the visitor did not give it. '
            . 'Copy phone numbers and e-mail addresses exactly.',
        messages: [['role' => 'user', 'content' => "Conversation:\n\n" . $transcript]],
        outputConfig: [
            'effort' => 'low',
            'format' => [
                'type' => 'json_schema',
                'schema' => [
                    'type' => 'object',
                    'properties' => [
                        'outcome' => ['type' => 'string', 'enum' => ['interested', 'callback_requested', 'not_interested', 'do_not_call', 'no_answer']],
                        'name' => $text,
                        'phone' => $text,
                        'other_contact' => $text,
                        'requirement' => $text,
                        'pipe_size_or_length' => $text,
                        'timeline' => $text,
                        'callback_time' => $text,
                        'note' => ['type' => 'string', 'description' => 'One line for the salesperson.'],
                        'language' => ['type' => 'string', 'description' => 'Language the visitor used.'],
                    ],
                    'required' => ['outcome', 'name', 'phone', 'other_contact', 'requirement', 'pipe_size_or_length', 'timeline', 'callback_time', 'note', 'language'],
                    'additionalProperties' => false,
                ],
            ],
        ],
    );
    if ($message->stopReason !== 'end_turn') {
        return null;
    }
    $record = json_decode(textOf($message), true);
    return is_array($record) ? $record : null;
}

/** Mail the lead report. Returns true when the mail was handed to the server. */
function sendReport(Client $client, array $settings, array $messages, bool $dnc): bool
{
    $transcript = transcript($messages);
    try {
        $record = leadRecord($client, $settings, $transcript);
    } catch (Throwable $e) {
        error_log('quickair assistant: lead record failed: ' . $e->getMessage());
        $record = null;
    }
    if ($record !== null && $dnc) {
        $record['outcome'] = 'do_not_call';
    }

    $labels = [
        'outcome' => 'Outcome', 'name' => 'Name', 'phone' => 'Phone', 'other_contact' => 'Other contact',
        'requirement' => 'Requirement', 'pipe_size_or_length' => 'Pipe size or length', 'timeline' => 'Timeline',
        'callback_time' => 'Callback time', 'note' => 'Note', 'language' => 'Language',
    ];
    $body = "A visitor spoke to the Quickair Assistant on the website.\n\n";
    if ($record === null) {
        $body .= "The summary could not be prepared. Please read the conversation below.\n";
    } else {
        foreach ($labels as $key => $label) {
            $value = trim((string) ($record[$key] ?? ''));
            $body .= str_pad($label . ':', 22) . ($value === '' ? '-' : $value) . "\n";
        }
    }
    $body .= "\nTime: " . (new DateTime('now', new DateTimeZone('Asia/Kolkata')))->format('d M Y, h:i A') . " IST\n";
    $body .= "\n--- Conversation ---\n" . $transcript . "\n";

    $outcome = $record['outcome'] ?? 'conversation';
    $who = trim((string) ($record['name'] ?? ''));
    $subject = 'Quickair Assistant: ' . str_replace('_', ' ', $outcome) . ($who === '' ? '' : ' - ' . $who);
    $subject = preg_replace('/[\r\n]+/', ' ', $subject);

    $from = $settings['report_from'];
    $envelope = preg_match('/<([^>]+)>/', $from, $m) ? $m[1] : $from;
    $headers = "From: {$from}\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit";
    $sent = mail(
        implode(', ', $settings['report_to']),
        mb_encode_mimeheader($subject, 'UTF-8'),
        str_replace("\n", "\r\n", $body),
        $headers,
        '-f' . $envelope,
    );
    if (!$sent) {
        error_log('quickair assistant: mail() refused the lead report');
    }
    return $sent;
}

// ---------------------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['error' => 'post_only']);
}
// Only this site's own pages may call the endpoint.
$origin = parse_url($_SERVER['HTTP_ORIGIN'] ?? '', PHP_URL_HOST);
$host = strtolower(explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]);
if ($origin !== null && $origin !== false && strtolower($origin) !== $host) {
    respond(403, ['error' => 'forbidden']);
}

$settings = require PRIVATE_DIR . '/settings.php';
$config = is_file(PRIVATE_DIR . '/config.php') ? require PRIVATE_DIR . '/config.php' : [];
$apiKey = $config['anthropic_api_key'] ?? '';
if ($apiKey === '' || !is_file(PRIVATE_DIR . '/vendor/autoload.php')) {
    respond(503, ['error' => 'not_configured']);
}

$input = json_decode(file_get_contents('php://input', false, null, 0, 100000) ?: '', true);
if (!is_array($input)) {
    respond(400, ['error' => 'bad_request']);
}
$action = $input['action'] ?? '';
$messages = conversation($input['messages'] ?? null, $settings);
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$hour = gmdate('YmdH');

require PRIVATE_DIR . '/vendor/autoload.php';
set_time_limit(90);
$client = new Client(apiKey: $apiKey);

if ($action === 'report') {
    // A conversation the visitor left before the assistant closed it.
    if (count($messages) < 3) {
        respond(200, ['sent' => false]); // the visitor never said anything
    }
    if (!allow("report|{$ip}|{$hour}", $settings['report_per_ip_hour'])) {
        respond(429, ['error' => 'too_many']);
    }
    respond(200, ['sent' => sendReport($client, $settings, $messages, false)]);
}

if ($action !== 'chat' || end($messages)['role'] !== 'user') {
    respond(400, ['error' => 'bad_request']);
}
if (!allow('chat|all|' . gmdate('Ymd'), $settings['chat_per_day']) || !allow("chat|{$ip}|{$hour}", $settings['chat_per_ip_hour'])) {
    respond(429, ['error' => 'too_many']);
}

try {
    $message = $client->beta->messages->create(
        model: $settings['model'],
        maxTokens: 4000,
        betas: [FALLBACK_BETA],
        fallbacks: 'default',
        system: require PRIVATE_DIR . '/prompt.php',
        messages: $messages,
        outputConfig: ['effort' => 'low'], // spoken replies: keep the wait short
    );
} catch (AuthenticationException $e) {
    error_log('quickair assistant: the API key was rejected');
    respond(503, ['error' => 'not_configured']);
} catch (RateLimitException $e) {
    respond(429, ['error' => 'too_many']);
} catch (APIStatusException | APIConnectionException $e) {
    error_log('quickair assistant: ' . $e->getMessage());
    respond(502, ['error' => 'assistant_unavailable']);
}

$reply = $message->stopReason === 'refusal' ? '' : textOf($message);
$dnc = str_contains($reply, '[DNC]');
$end = $dnc || str_contains($reply, '[END]');
$reply = trim(str_replace(['[DNC]', '[END]'], '', $reply));
if ($reply === '') {
    respond(502, ['error' => 'assistant_unavailable']);
}

if (!$end || !allow("report|{$ip}|{$hour}", $settings['report_per_ip_hour'])) {
    respond(200, ['reply' => $reply, 'end' => $end, 'dnc' => $dnc, 'reported' => false]);
}

// Conversation closed: answer the visitor now, then write and mail the lead report.
http_response_code(200);
echo json_encode(['reply' => $reply, 'end' => true, 'dnc' => $dnc, 'reported' => true], JSON_UNESCAPED_UNICODE);
ignore_user_abort(true);
if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request();
} elseif (function_exists('litespeed_finish_request')) {
    litespeed_finish_request();
} else {
    flush();
}
$messages[] = ['role' => 'assistant', 'content' => $reply];
sendReport($client, $settings, $messages, $dnc);
