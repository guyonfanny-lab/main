import type { DonjonFrame } from '../types'

function lastFrame(frames: DonjonFrame[]): DonjonFrame | undefined {
  return frames[frames.length - 1]
}

export function donjonAt(frames: DonjonFrame[], x: number, y: number): boolean {
  const frame = lastFrame(frames)
  return !!frame && frame.robotX === x && frame.robotY === y
}

/** True once every monster is defeated and every door is opened (the dungeon is fully cleared). */
export function donjonCleared(frames: DonjonFrame[]): boolean {
  const frame = lastFrame(frames)
  if (!frame) return false
  return frame.grid.every((row) => row.every((cell) => !cell.startsWith('monstre') && cell !== 'porte'))
}
