import type { FarmFrame } from '../types'

function lastFrame(frames: FarmFrame[]): FarmFrame | undefined {
  return frames[frames.length - 1]
}

/** True if no farm frames exist yet — the code never called a tractor function. */
export function noFarmActionTaken(frames: FarmFrame[]): boolean {
  return frames.length <= 1
}

export function tractorAt(frames: FarmFrame[], x: number, y: number): boolean {
  const frame = lastFrame(frames)
  return !!frame && frame.tractorX === x && frame.tractorY === y
}

export function allHarvested(frames: FarmFrame[]): boolean {
  const frame = lastFrame(frames)
  if (!frame) return false
  return frame.grid.every((row) => row.every((cell) => cell !== 'recolte'))
}

export function cellHarvested(frames: FarmFrame[], x: number, y: number): boolean {
  const frame = lastFrame(frames)
  return !!frame && frame.grid[y]?.[x] !== 'recolte'
}
