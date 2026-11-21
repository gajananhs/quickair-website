<?php
// Settings for the "Talk to Quickair Assistant" button. No secrets here:
// the API key lives in config.php, which the deploy workflow writes.
return [
    // Claude model that speaks with the visitor and writes the lead report.
    'model' => 'claude-opus-5-5',

    // Every finished conversation is mailed to these people.
    'report_to' => [
        'sagarpatil@canares.com',
        'priyanka@canares.com',
        'shilpa@canares.com',
        'ecommerce@canares.com',
    ],
    'report_from' => 'Quickair Assistant <assistant@quickair.in>',

    // Abuse limits. The endpoint is public, so these cap what a stranger can spend.
    'max_turns' => 40,             // messages in one conversation
    'max_chars' => 600,            // characters in one visitor message
    'chat_per_ip_hour' => 120,     // replies per visitor address per hour
    'report_per_ip_hour' => 6,     // lead mails per visitor address per hour
    'chat_per_day' => 3000,        // replies per day, all visitors together
];
