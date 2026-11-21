import { useEffect, useImperativeHandle, useRef } from 'react'
import { createAssemblyScene } from '@/three/createAssemblyScene'
import { allow3DMotion } from '@/lib/motion'
import { cn } from '@/lib/cn'

/**
 * React mount point for the 3D piping assembly. Always import lazily:
 *
 *   const AssemblyCanvas = lazy(() => import('@/components/three/AssemblyCanvas'))
 *
 * `idle`     gentle auto-rotation + pointer parallax (hero use)
 * `shift`    offsets the scene to leave room for captions
 * `explore`  interactive diagram: drag to rotate, hover parts (onHover), ref.setExplode()
 * `links`    hover/tap parts (onHover, onAnchor) and click them (onPick), presentation unchanged
 * `ref`      ref.current.setProgress(0..1) for scroll-driven use
 */
export default function AssemblyCanvas({ className, idle = false, shift = false, explore = false, links = false, onHover, onPick, onAnchor, ref }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const hoverRef = useRef(onHover)
  hoverRef.current = onHover
  const pickRef = useRef(onPick)
  pickRef.current = onPick
  const anchorRef = useRef(onAnchor)
  anchorRef.current = onAnchor

  useImperativeHandle(ref, () => ({
    setProgress: (value) => sceneRef.current?.setProgress(value),
    setExplode: (value) => sceneRef.current?.setExplode(value),
    clearHover: () => sceneRef.current?.clearHover(),
  }))

  useEffect(() => {
    const reduced = !allow3DMotion()
    try {
      sceneRef.current = createAssemblyScene(containerRef.current, {
        idle: idle && !reduced,
        animate: !reduced,
        interactive: !reduced,
        shift,
        explore,
        links,
        onHover: (info) => hoverRef.current?.(info),
        onPick: (info, pointerType) => pickRef.current?.(info, pointerType),
        onAnchor: (x, y) => anchorRef.current?.(x, y),
      })
    } catch (error) {
      console.warn('AssemblyCanvas: WebGL scene could not start', error)
    }
    return () => {
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [idle, shift, explore, links])

  return <div ref={containerRef} aria-hidden="true" className={cn('h-full w-full', className)} />
}
