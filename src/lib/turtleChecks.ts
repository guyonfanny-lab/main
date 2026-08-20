import type { DrawCommand } from '../types'

/** Length of a drawn segment, in canvas pixels. */
export function segmentLength(cmd: DrawCommand): number {
  return Math.hypot(cmd.x2 - cmd.x1, cmd.y2 - cmd.y1)
}

/** True if every drawn segment is roughly the given length. */
export function allSegmentsLength(commands: DrawCommand[], expected: number, tolerance = 4): boolean {
  return commands.length > 0 && commands.every((c) => Math.abs(segmentLength(c) - expected) <= tolerance)
}

/** True if the path returns close to where it started (a closed shape). */
export function pathCloses(commands: DrawCommand[], tolerance = 4): boolean {
  if (commands.length === 0) return false
  const first = commands[0]
  const last = commands[commands.length - 1]
  return Math.hypot(last.x2 - first.x1, last.y2 - first.y1) <= tolerance
}

/** True if every drawn segment uses (approximately) the given hex color. */
export function allSegmentsColor(commands: DrawCommand[], hex: string): boolean {
  return commands.length > 0 && commands.every((c) => c.color.toLowerCase() === hex.toLowerCase())
}

/** Angle (0-180°) between the directions of two segments. */
export function angleBetween(a: DrawCommand, b: DrawCommand): number {
  const v1 = { x: a.x2 - a.x1, y: a.y2 - a.y1 }
  const v2 = { x: b.x2 - b.x1, y: b.y2 - b.y1 }
  const dot = v1.x * v2.x + v1.y * v2.y
  const mag = Math.hypot(v1.x, v1.y) * Math.hypot(v2.x, v2.y)
  if (mag === 0) return 0
  const cos = Math.min(1, Math.max(-1, dot / mag))
  return (Math.acos(cos) * 180) / Math.PI
}
