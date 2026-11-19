/**
 * Procedural Quick Air piping assembly (plain Three.js).
 *
 * Blue powder-coated aluminium pipe, grey aluminium fittings with black
 * collar nuts, a ball valve, end caps, outlets and support clamps.
 *
 * The whole presentation is a pure function of `progress` (0..1), so a
 * scrubbed ScrollTrigger can drive it in both directions:
 *
 *   0.00–0.14  complete assembly, slow rotation
 *   0.14–0.34  camera orbits in, fittings light up one by one
 *   0.34–0.50  selected connectors slide off their pipes
 *   0.50–0.74  full exploded view
 *   0.74–0.92  every part returns to position
 *   0.92–1.00  complete system, camera pulls back
 *
 * With `explore: true` the scene becomes an interactive diagram instead:
 * drag to rotate, hover a part to highlight it (onHover receives its name),
 * and setExplode(0..1) pulls the parts apart.
 *
 * With `links: true` (hero use) the presentation is unchanged, but parts can be
 * hovered or tapped: the part glows as in explore mode, onHover receives it,
 * onAnchor(x, y) reports its on-screen position every frame (so a label can
 * follow it while the model rotates) and onPick(part, pointerType) fires on a
 * click or tap.
 *
 * createAssemblyScene(container, options) → { setProgress, setExplode, dispose }
 */
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

const V = (x, y, z) => new THREE.Vector3(x, y, z)
const UP = V(0, 1, 0)
const clamp01 = (x) => Math.min(1, Math.max(0, x))
const smooth = (a, b, x) => {
  const t = clamp01((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

export function createAssemblyScene(container, { idle = false, animate = true, interactive = true, shift = false, explore = false, links = false, onHover = null, onPick = null, onAnchor = null } = {}) {
  const lowPower = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4
  const SEG = lowPower ? 20 : 40

  const renderer = new THREE.WebGLRenderer({ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.5 : 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15
  renderer.shadowMap.enabled = !lowPower
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%'
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)

  const pmrem = new THREE.PMREMGenerator(renderer)
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envMap

  // --- Lights: soft key with shadows, cyan rim, cool fill ---
  const key = new THREE.DirectionalLight(0xffffff, 2.4)
  key.position.set(5, 8, 6)
  key.castShadow = !lowPower
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.camera.left = -9
  key.shadow.camera.right = 9
  key.shadow.camera.top = 9
  key.shadow.camera.bottom = -9
  key.shadow.camera.far = 30
  key.shadow.bias = -0.0005
  key.shadow.radius = 6
  const rim = new THREE.DirectionalLight(0x2ccbf2, 2.6)
  rim.position.set(-7, 1, -6)
  const fill = new THREE.DirectionalLight(0x0b8fc2, 0.9)
  fill.position.set(0, -4, 6)
  scene.add(key, rim, fill)

  // --- Materials ---
  const disposables = [envMap, pmrem]
  const mat = (m) => (disposables.push(m), m)
  const pipeMat = mat(new THREE.MeshPhysicalMaterial({ color: 0x1f7fd1, metalness: 0.55, roughness: 0.34, clearcoat: 0.7, clearcoatRoughness: 0.25 }))
  const boreMat = mat(new THREE.MeshStandardMaterial({ color: 0xc9d1da, metalness: 0.95, roughness: 0.28, side: THREE.BackSide }))
  const rimMat = mat(new THREE.MeshStandardMaterial({ color: 0xdfe5ec, metalness: 1, roughness: 0.2 }))
  const nutMat = mat(new THREE.MeshStandardMaterial({ color: 0x14181d, metalness: 0.35, roughness: 0.55, flatShading: true }))
  const handleMat = mat(new THREE.MeshStandardMaterial({ color: 0x0b8fc2, metalness: 0.3, roughness: 0.4 }))
  const steelMat = mat(new THREE.MeshStandardMaterial({ color: 0xb7c0ca, metalness: 1, roughness: 0.22 }))
  // Each fitting gets its own body material so it can glow on its own.
  const fittingMat = () => mat(new THREE.MeshStandardMaterial({ color: 0x8d969f, metalness: 0.9, roughness: 0.36, emissive: 0x2ccbf2, emissiveIntensity: 0 }))

  // --- Shared unit geometries (scaled per mesh) ---
  const geo = (g) => (disposables.push(g), g)
  const cylGeo = geo(new THREE.CylinderGeometry(1, 1, 1, SEG, 1))
  const openCylGeo = geo(new THREE.CylinderGeometry(1, 1, 1, SEG, 1, true))
  const nutGeo = geo(new THREE.CylinderGeometry(1, 1, 1, 12, 1))
  const ringGeo = geo(new THREE.RingGeometry(0.84, 1, SEG))
  const sphereGeo = geo(new THREE.SphereGeometry(1, SEG, Math.round(SEG / 1.6)))
  const boxGeo = geo(new THREE.BoxGeometry(1, 1, 1))
  const torusGeo = geo(new THREE.TorusGeometry(1, 0.12, 10, SEG))

  const assembly = new THREE.Group()
  scene.add(assembly)
  const parts = []
  const CENTER = V(0, 0.15, 0)

  /** Cylinder between two points (local to parent). */
  const rod = (parent, a, b, radius, material, geometry = cylGeo) => {
    const dir = b.clone().sub(a)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.set(radius, dir.length(), radius)
    mesh.position.copy(a).addScaledVector(dir, 0.5)
    mesh.quaternion.setFromUnitVectors(UP, dir.normalize())
    mesh.castShadow = true
    mesh.receiveShadow = true
    parent.add(mesh)
    return mesh
  }

  /** Register a part: group sits at `home`, flies along `explode`. */
  const part = (home, { kind, explode, select } = {}) => {
    const group = new THREE.Group()
    group.position.copy(home)
    assembly.add(group)
    const out = home.clone().sub(CENTER)
    const entry = {
      group,
      home: home.clone(),
      kind,
      // Exploded view: pipes stay almost in place as the skeleton, fittings lift
      // off them (upper run rises, drops and outlets fall away) and spread outwards.
      explode: explode ?? (kind === 'pipe' ? out.clone().multiplyScalar(0.1) : out.clone().setY(0).multiplyScalar(0.42).add(V(0, home.y > 0.6 ? 1.0 : -0.8, 0))),
      select: select ?? null,
      body: null,
      index: parts.length,
    }
    parts.push(entry)
    return entry
  }

  /** Socket + collar nut at a fitting port. `dir` points out of the fitting. */
  const port = (group, body, from, dir, r) => {
    const a = from.clone()
    const b = from.clone().addScaledVector(dir, r * 1.45)
    rod(group, a, b, r * 1.42, body)
    rod(group, b.clone().addScaledVector(dir, -r * 0.15), b.clone().addScaledVector(dir, r * 0.75), r * 1.62, nutMat, nutGeo)
    return b.clone().addScaledVector(dir, r * 0.75)
  }
  /** Distance from a fitting's centre to the end of its port. */
  const reach = (r, stub) => stub + r * 2.2

  const pipe = (a, b, r) => {
    const mid = a.clone().add(b).multiplyScalar(0.5)
    const p = part(mid, { kind: 'pipe' })
    const la = a.clone().sub(mid)
    const lb = b.clone().sub(mid)
    rod(p.group, la, lb, r, pipeMat, openCylGeo)
    rod(p.group, la, lb, r * 0.86, boreMat, openCylGeo)
    const dir = lb.clone().sub(la).normalize()
    for (const [end, sign] of [[la, -1], [lb, 1]]) {
      const ring = new THREE.Mesh(ringGeo, rimMat)
      ring.scale.setScalar(r)
      ring.position.copy(end)
      ring.quaternion.setFromUnitVectors(V(0, 0, 1), dir.clone().multiplyScalar(sign))
      p.group.add(ring)
    }
    return p
  }

  const elbow = (at, d1, d2, r, opts) => {
    const p = part(at, { kind: 'fitting', ...opts })
    const body = (p.body = fittingMat())
    const stub = r * 1.5
    const curve = new THREE.QuadraticBezierCurve3(d1.clone().multiplyScalar(stub), V(0, 0, 0), d2.clone().multiplyScalar(stub))
    const tube = new THREE.Mesh(geo(new THREE.TubeGeometry(curve, 14, r * 1.3, SEG, false)), body)
    tube.castShadow = true
    p.group.add(tube)
    port(p.group, body, d1.clone().multiplyScalar(stub * 0.9), d1, r)
    port(p.group, body, d2.clone().multiplyScalar(stub * 0.9), d2, r)
    p.reach = reach(r, stub * 0.9)
    return p
  }

  const tee = (at, axis, branch, r, rb, opts) => {
    const p = part(at, { kind: 'fitting', ...opts })
    const body = (p.body = fittingMat())
    const stub = r * 1.3
    rod(p.group, axis.clone().multiplyScalar(-stub), axis.clone().multiplyScalar(stub), r * 1.3, body)
    rod(p.group, V(0, 0, 0), branch.clone().multiplyScalar(stub), rb * 1.3, body)
    port(p.group, body, axis.clone().multiplyScalar(stub * 0.9), axis, r)
    port(p.group, body, axis.clone().multiplyScalar(-stub * 0.9), axis.clone().negate(), r)
    port(p.group, body, branch.clone().multiplyScalar(stub * 0.9), branch, rb)
    p.reach = reach(r, stub * 0.9)
    p.branchReach = reach(rb, stub * 0.9)
    return p
  }

  const coupler = (at, axis, r, opts) => {
    const p = part(at, { kind: 'fitting', ...opts })
    const body = (p.body = fittingMat())
    const stub = r * 0.9
    rod(p.group, axis.clone().multiplyScalar(-stub), axis.clone().multiplyScalar(stub), r * 1.3, body)
    rod(p.group, axis.clone().multiplyScalar(-stub * 0.55), axis.clone().multiplyScalar(stub * 0.55), r * 1.5, steelMat)
    port(p.group, body, axis.clone().multiplyScalar(stub * 0.9), axis, r)
    port(p.group, body, axis.clone().multiplyScalar(-stub * 0.9), axis.clone().negate(), r)
    p.reach = reach(r, stub * 0.9)
    return p
  }

  const valve = (at, axis, side, r, opts) => {
    const p = coupler(at, axis, r, opts)
    const ball = new THREE.Mesh(sphereGeo, p.body)
    ball.scale.setScalar(r * 2.05)
    ball.castShadow = true
    p.group.add(ball)
    rod(p.group, V(0, 0, 0), side.clone().multiplyScalar(r * 2.9), r * 0.5, steelMat)
    const handle = new THREE.Mesh(boxGeo, handleMat)
    handle.scale.set(r * 0.9, r * 0.45, r * 6.2)
    handle.position.copy(side.clone().multiplyScalar(r * 3.1)).addScaledVector(axis, r * 2.2)
    handle.quaternion.setFromUnitVectors(V(0, 0, 1), axis)
    handle.castShadow = true
    p.group.add(handle)
    return p
  }

  const endCap = (at, dir, r, opts) => {
    const p = part(at, { kind: 'fitting', ...opts })
    const body = (p.body = fittingMat())
    port(p.group, body, V(0, 0, 0), dir.clone().negate(), r)
    rod(p.group, V(0, 0, 0), dir.clone().multiplyScalar(r * 0.9), r * 1.42, body)
    const dome = new THREE.Mesh(sphereGeo, body)
    dome.scale.set(r * 1.42, r * 0.7, r * 1.42)
    dome.position.copy(dir.clone().multiplyScalar(r * 0.9))
    dome.quaternion.setFromUnitVectors(UP, dir)
    p.group.add(dome)
    p.reach = r * 2.2
    return p
  }

  /** Wall outlet block with two quick couplings. */
  const outlet = (at, dir, r, opts) => {
    const p = part(at, { kind: 'fitting', ...opts })
    const body = (p.body = fittingMat())
    port(p.group, body, V(0, 0, 0), dir.clone().negate(), r)
    const block = new THREE.Mesh(boxGeo, body)
    block.scale.set(r * 4.6, r * 3, r * 3)
    block.position.copy(dir.clone().multiplyScalar(r * 1.4))
    block.castShadow = true
    p.group.add(block)
    for (const x of [-1, 1]) {
      const base = V(x * r * 1.25, -r * 1.4, 0).add(dir.clone().multiplyScalar(r * 1.4))
      rod(p.group, base, base.clone().add(V(0, -r * 1.5, 0)), r * 0.55, steelMat)
      rod(p.group, base.clone().add(V(0, -r * 1.5, 0)), base.clone().add(V(0, -r * 2.2, 0)), r * 0.75, nutMat, nutGeo)
    }
    p.reach = r * 2.2
    return p
  }

  /** Support clamp gripping a pipe, with a stem to the "wall". */
  const clampAt = (at, axis, stemDir, r) => {
    const p = part(at, { kind: 'clamp', explode: stemDir.clone().multiplyScalar(1.1) })
    const ring = new THREE.Mesh(torusGeo, nutMat)
    ring.scale.setScalar(r * 1.18)
    ring.quaternion.setFromUnitVectors(V(0, 0, 1), axis)
    ring.castShadow = true
    p.group.add(ring)
    rod(p.group, stemDir.clone().multiplyScalar(r * 1.25), stemDir.clone().multiplyScalar(r * 4.2), r * 0.32, steelMat)
    rod(p.group, stemDir.clone().multiplyScalar(r * 4.2), stemDir.clone().multiplyScalar(r * 4.6), r * 1.3, nutMat, nutGeo)
    return p
  }

  // ---------------------------------------------------------------- layout
  const R = 0.165 // main line
  const r = 0.115 // drops
  const X = V(1, 0, 0), Y = V(0, 1, 0), Z = V(0, 0, 1)
  const nX = V(-1, 0, 0), nY = V(0, -1, 0), nZ = V(0, 0, -1)
  const H = 1.15 // header height

  const e1 = elbow(V(-4.1, H, 0), X, Z, R)
  const t1 = tee(V(-1.9, H, 0), X, nY, R, r, { select: V(0, 0.55, 0.95) })
  const c1 = coupler(V(0.4, H, 0), X, R, { select: V(0, 1.05, 0) })
  const t2 = tee(V(2.3, H, 0), X, nY, R, r)
  const e2 = elbow(V(4.1, H, 0), nX, nZ, R, { select: V(0.85, 0.35, 0.5) })
  const e3 = elbow(V(4.1, H, -2.4), Z, nY, R)

  // main header pipes between fittings
  const between = (a, b, dir, ra, rb, radius) => pipe(a.home.clone().addScaledVector(dir, ra), b.home.clone().addScaledVector(dir, -rb), radius)
  between(e1, t1, X, e1.reach, t1.reach, R)
  between(t1, c1, X, t1.reach, c1.reach, R)
  between(c1, t2, X, c1.reach, t2.reach, R)
  between(t2, e2, X, t2.reach, e2.reach, R)
  // back run and its drop
  pipe(e2.home.clone().addScaledVector(nZ, e2.reach), e3.home.clone().addScaledVector(Z, e3.reach), R)
  const capA = endCap(V(4.1, -0.85, -2.4), nY, R)
  pipe(e3.home.clone().addScaledVector(nY, e3.reach), capA.home.clone().addScaledVector(Y, capA.reach), R)
  // front stub with end cap
  const capB = endCap(V(-4.1, H, 2.2), Z, R)
  pipe(e1.home.clone().addScaledVector(Z, e1.reach), capB.home.clone().addScaledVector(nZ, capB.reach), R)

  // drop 1: tee → elbow → outlet
  const e4 = elbow(V(-1.9, -1.2, 0), Y, Z, r)
  pipe(t1.home.clone().addScaledVector(nY, t1.branchReach), e4.home.clone().addScaledVector(Y, e4.reach), r)
  const o1 = outlet(V(-1.9, -1.2, 1.35), Z, r)
  pipe(e4.home.clone().addScaledVector(Z, e4.reach), o1.home.clone().addScaledVector(nZ, o1.reach), r)

  // drop 2: tee → valve → outlet
  const v1 = valve(V(2.3, -0.05, 0), Y, Z, r, { select: V(0, 0, 1.1) })
  pipe(t2.home.clone().addScaledVector(nY, t2.branchReach), v1.home.clone().addScaledVector(Y, v1.reach), r)
  const o2 = outlet(V(2.3, -1.35, 0), nY, r)
  pipe(v1.home.clone().addScaledVector(nY, v1.reach), o2.home.clone().addScaledVector(Y, o2.reach), r)

  // supports
  clampAt(V(-3.0, H, 0), X, nZ, R)
  clampAt(V(1.35, H, 0), X, nZ, R)
  clampAt(V(4.1, H, -1.2), Z, X, R)

  // Names shown when a part is hovered (wording from the Quick Air product list).
  const NAMES = new Map([
    [e1, 'Equal and reduced elbows'], [e2, 'Equal and reduced elbows'], [e3, 'Equal and reduced elbows'], [e4, 'Equal and reduced elbows'],
    [t1, 'Equal and reduced tees'], [t2, 'Equal and reduced tees'],
    [c1, 'Pipe-to-pipe connectors'], [v1, 'Valves and actuators'],
    [capA, 'End caps'], [capB, 'End caps'], [o1, 'Droplets'], [o2, 'Droplets'],
  ])
  for (const p of parts) {
    p.name = NAMES.get(p) ?? (p.kind === 'pipe' ? 'Aluminium modular piping' : 'Clamps and brackets')
    p.group.traverse((o) => { o.userData.part = p })
  }
  if (explore || links) {
    // every pipe gets its own material so it can glow when hovered
    for (const p of parts) {
      if (p.kind !== 'pipe') continue
      const glow = mat(pipeMat.clone())
      glow.emissive = new THREE.Color(0x2ccbf2)
      glow.emissiveIntensity = 0
      p.group.traverse((o) => { if (o.isMesh && o.material === pipeMat) o.material = glow })
      p.glow = glow
    }
  }
  const fittings = parts.filter((p) => p.kind === 'fitting')

  // ground shadow
  const ground = new THREE.Mesh(geo(new THREE.PlaneGeometry(30, 30)), mat(new THREE.ShadowMaterial({ opacity: 0.38 })))
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -2.3
  ground.receiveShadow = true
  scene.add(ground)

  // ---------------------------------------------------------------- state
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 }
  let progress = 0
  let shown = 0 // smoothed progress
  let intro = animate ? 0 : 1
  let introStart = null
  let frame = 0
  let disposed = false
  let aspect = 1
  const clock = new THREE.Clock()
  const tmp = V(0, 0, 0)
  // explore mode
  let hovered = null
  let dragging = false
  let userAz = 0
  let userEl = 0
  let spin = 0
  let manualExplode = 0
  let explodeShown = 0
  // links mode
  let glowing = false
  let updateLinks = null
  let clearTouch = null
  let removeLinks = null

  const apply = (p, time) => {
    const explode = explore ? explodeShown : smooth(0.5, 0.64, p) * (1 - smooth(0.74, 0.9, p))
    const select = explore ? 0 : smooth(0.34, 0.47, p) * (1 - smooth(0.74, 0.9, p))

    for (const part of parts) {
      // staggered entrance
      const t = easeOutCubic(clamp01(intro * 1.9 - part.index * 0.028))
      tmp.copy(part.home).addScaledVector(part.explode, explode)
      if (part.select) tmp.addScaledVector(part.select, select * (1 - explode * 0.35))
      tmp.y += (1 - t) * 1.4
      part.group.position.copy(tmp)
      part.group.scale.setScalar(0.001 + t * 0.999)
      // exploded parts tumble slightly so the view reads as "taken apart"
      const spin = explode * (part.kind === 'pipe' ? 0 : 0.1) * (part.index % 2 ? 1 : -1)
      part.group.rotation.set(spin, spin * 0.6, 0)
    }

    // fittings light up one after another, then selected ones stay lit while separated
    if (explore) {
      for (const part of parts) {
        const m = part.body ?? part.glow
        if (m) m.emissiveIntensity += ((part === hovered ? 0.9 : 0) - m.emissiveIntensity) * 0.25
      }
    } else if (links && (hovered || glowing)) {
      glowing = false
      for (const part of parts) {
        const m = part.body ?? part.glow
        if (!m) continue
        const target = part === hovered ? 0.9 : 0
        m.emissiveIntensity = animate ? m.emissiveIntensity + (target - m.emissiveIntensity) * 0.25 : target
        if (m.emissiveIntensity > 0.001) glowing = true
      }
    } else {
      const sweep = (p - 0.14) / 0.2
      fittings.forEach((f, i) => {
        const x = sweep * (fittings.length + 1) - i
        const pulse = x > 0 && x < 1.6 ? Math.sin((x / 1.6) * Math.PI) : 0
        f.body.emissiveIntensity = pulse * 0.9 + (f.select ? select * (1 - explode) * 0.55 : 0)
      })
    }

    // camera path
    const sway = explore ? spin + userAz : idle ? Math.sin(time * 0.28) * 0.22 + pointer.sx * 0.3 : pointer.sx * 0.12
    const azimuth = -0.62 + p * Math.PI * 1.7 + sway
    const elevation = 0.3 + Math.sin(p * Math.PI) * 0.22 + (explore ? userEl : idle ? pointer.sy * 0.12 : 0)
    const zoomIn = smooth(0.14, 0.3, p) * (1 - smooth(0.44, 0.56, p))
    const zoomOut = explode
    let radius = 16.5 - zoomIn * 1.9 + zoomOut * 3.2
    if (aspect < 1.15) radius *= Math.min(2.1, 1.15 / aspect) // keep the run in frame on tall screens
    else if (shift && container.clientWidth < 1024) radius *= 1.25 // room for captions below the model
    camera.position.set(
      CENTER.x + Math.sin(azimuth) * Math.cos(elevation) * radius,
      CENTER.y + Math.sin(elevation) * radius,
      CENTER.z + Math.cos(azimuth) * Math.cos(elevation) * radius,
    )
    camera.lookAt(CENTER.x, CENTER.y - 0.15 + zoomIn * 0.5, CENTER.z)
    assembly.rotation.y = idle ? time * 0.06 : 0
  }

  const render = () => {
    if (disposed) return
    // Wall-clock timing: the result is the same at 2 fps or 120 fps.
    const dt = Math.min(clock.getDelta(), 0.25)
    const time = clock.elapsedTime
    if (introStart === null) introStart = performance.now()
    intro = animate ? Math.min(1, (performance.now() - introStart) / 1800) : 1
    shown += (progress - shown) * Math.min(1, dt * 7)
    explodeShown += (manualExplode - explodeShown) * Math.min(1, dt * 5)
    if (explore && !dragging && !hovered) spin += dt * 0.09
    const ease = Math.min(1, dt * 3)
    pointer.sx += (pointer.x - pointer.sx) * ease
    pointer.sy += (pointer.y - pointer.sy) * ease
    apply(shown, time)
    renderer.render(scene, camera)
    updateLinks?.()
    frame = requestAnimationFrame(render)
  }
  const start = () => {
    if (!animate || frame || disposed) return
    clock.getDelta()
    frame = requestAnimationFrame(render)
  }
  const stop = () => {
    cancelAnimationFrame(frame)
    frame = 0
  }
  const renderOnce = () => {
    apply(progress, 0)
    renderer.render(scene, camera)
    updateLinks?.()
  }

  const onPointerMove = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1
  }
  if (interactive && animate) window.addEventListener('pointermove', onPointerMove, { passive: true })

  // --- explore mode: drag to rotate, hover to identify a part ---
  if (explore) {
    const el = renderer.domElement
    const raycaster = new THREE.Raycaster()
    const ndc = new THREE.Vector2()
    let lastX = 0
    let lastY = 0
    el.style.touchAction = 'pan-y'
    el.style.cursor = 'grab'
    const pick = (e) => {
      const rect = el.getBoundingClientRect()
      ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1)
      raycaster.setFromCamera(ndc, camera)
      const hit = raycaster.intersectObjects(assembly.children, true)[0]
      hovered = hit?.object.userData.part ?? null
      el.style.cursor = hovered ? 'pointer' : 'grab'
      onHover?.(hovered ? { name: hovered.name, kind: hovered.kind, x: e.clientX - rect.left, y: e.clientY - rect.top } : null)
    }
    el.addEventListener('pointerdown', (e) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      el.setPointerCapture?.(e.pointerId)
      el.style.cursor = 'grabbing'
    })
    el.addEventListener('pointermove', (e) => {
      if (dragging) {
        userAz -= (e.clientX - lastX) * 0.008
        userEl = Math.min(0.75, Math.max(-0.45, userEl + (e.clientY - lastY) * 0.005))
        lastX = e.clientX
        lastY = e.clientY
      } else pick(e)
    })
    const release = (e) => {
      dragging = false
      el.style.cursor = 'grab'
      if (e.type === 'pointerleave') { hovered = null; onHover?.(null) }
    }
    el.addEventListener('pointerup', release)
    el.addEventListener('pointercancel', release)
    el.addEventListener('pointerleave', release)
  }

  // --- links mode: hover or tap a part to identify it, click it to open its product page ---
  if (links) {
    const el = renderer.domElement
    const root = document.documentElement
    const raycaster = new THREE.Raycaster()
    const ndc = new THREE.Vector2()
    const anchor = V(0, 0, 0)
    let mouse = null // last mouse position over the model
    let anchored = null // last part shown, so its label keeps following it
    let down = null
    // The canvas sits behind page content (the hero copy's boxes overlap it), so
    // it does not receive every event over the model. Pointer events are read on
    // the window instead: one counts when it is inside the canvas and not on a
    // link, button or field (those, including the part label, keep their own).
    const INTERACTIVE = 'a, button, input, select, textarea, label, [role="button"]'
    const overModel = (e) => {
      const rect = el.getBoundingClientRect()
      if (e.clientX < rect.left || e.clientX >= rect.right || e.clientY < rect.top || e.clientY >= rect.bottom) return false
      return e.target === el || !(e.target instanceof Element && e.target.closest(INTERACTIVE))
    }
    const partAt = (x, y) => {
      const rect = el.getBoundingClientRect()
      ndc.set(((x - rect.left) / rect.width) * 2 - 1, -((y - rect.top) / rect.height) * 2 + 1)
      raycaster.setFromCamera(ndc, camera)
      return raycaster.intersectObjects(assembly.children, true)[0]?.object.userData.part ?? null
    }
    const setHovered = (p) => {
      if (p === hovered) return
      hovered = p
      if (p) anchored = p
      // on the root too, so the pointer cursor also shows where page content overlaps the model
      el.style.cursor = root.style.cursor = p ? 'pointer' : ''
      onHover?.(p ? { id: p.index, name: p.name, kind: p.kind } : null)
      if (!frame) renderOnce()
    }
    // runs after each render, so picking and the label use the frame on screen
    updateLinks = () => {
      // the model keeps turning under a still cursor, so re-check what is under it
      if (mouse && animate) setHovered(partAt(mouse.x, mouse.y))
      if (!anchored || !onAnchor) return
      anchored.group.getWorldPosition(anchor).project(camera)
      onAnchor(((anchor.x + 1) / 2) * el.clientWidth, ((1 - anchor.y) / 2) * el.clientHeight)
    }
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      if (!overModel(e)) {
        mouse = null
        return setHovered(null)
      }
      mouse = { x: e.clientX, y: e.clientY }
      setHovered(partAt(e.clientX, e.clientY))
    }
    const onLeave = (e) => {
      if (e.pointerType !== 'mouse') return
      mouse = null
      setHovered(null)
    }
    const onDown = (e) => (down = overModel(e) ? { x: e.clientX, y: e.clientY } : null)
    const onCancel = () => (down = null)
    const onUp = (e) => {
      // a click or tap on the model, not a scroll or drag
      if (!down || !overModel(e) || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 8) return (down = null)
      down = null
      const p = partAt(e.clientX, e.clientY)
      onPick?.(p ? { id: p.index, name: p.name, kind: p.kind } : null, e.pointerType)
      if (e.pointerType !== 'mouse') setHovered(p) // touch: a tap shows the label
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointercancel', onCancel, { passive: true })
    window.addEventListener('pointerup', onUp)
    clearTouch = () => setHovered(null)
    removeLinks = () => {
      window.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointercancel', onCancel)
      window.removeEventListener('pointerup', onUp)
      if (hovered) root.style.cursor = ''
    }
  }

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container
    if (!w || !h) return
    renderer.setSize(w, h, false)
    aspect = w / h
    camera.aspect = aspect
    // shift: leave room for captions (scene moves right on wide screens, up on tall ones)
    // (matches the caption layout: beside the model from 1024px, below it on smaller screens)
    if (shift) camera.setViewOffset(w, h, w >= 1024 ? -w * 0.17 : 0, w >= 1024 ? 0 : h * 0.2, w, h)
    camera.updateProjectionMatrix()
    if (!frame) renderOnce()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)

  const intersectionObserver = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
  intersectionObserver.observe(container)

  resize()

  return {
    /** explore mode: 0 = assembled, 1 = fully exploded */
    setExplode(value) {
      manualExplode = clamp01(value)
      if (!animate) { explodeShown = manualExplode; renderOnce() }
    },
    setProgress(value) {
      progress = clamp01(value)
      if (!animate) renderOnce()
    },
    /** links mode: hide the label shown by a tap */
    clearHover() {
      clearTouch?.()
    },
    dispose() {
      disposed = true
      stop()
      window.removeEventListener('pointermove', onPointerMove)
      removeLinks?.()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      disposables.forEach((d) => d.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
