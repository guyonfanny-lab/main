import { useEffect, useRef } from 'react'
import type { DrawCommand } from '../types'

interface TurtleCanvasProps {
  commands: DrawCommand[]
}

const SIZE = 280

export default function TurtleCanvas({ commands }: TurtleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = SIZE * dpr
    canvas.height = SIZE * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, SIZE, SIZE)
    // (0, 0) in turtle-space is the center of the canvas.
    const originX = SIZE / 2
    const originY = SIZE / 2

    for (const cmd of commands) {
      ctx.beginPath()
      ctx.moveTo(originX + cmd.x1, originY + cmd.y1)
      ctx.lineTo(originX + cmd.x2, originY + cmd.y2)
      ctx.strokeStyle = cmd.color
      ctx.lineWidth = cmd.width
      ctx.lineCap = 'round'
      ctx.stroke()
    }
  }, [commands])

  return (
    <div className="mb-3 flex justify-center overflow-hidden rounded-xl bg-[#fafaf5]">
      <canvas ref={canvasRef} style={{ width: SIZE, height: SIZE }} />
    </div>
  )
}
