import { useEffect, useState } from 'react'
import type { FarmFrame } from '../types'

interface FarmGridProps {
  frames: FarmFrame[]
  characterEmoji?: string
}

const MAX_CELL_SIZE = 44
const MIN_CELL_SIZE = 16
// Conservative usable width inside the mobile layout (max-w-md, px-4, on a
// narrow phone like an iPhone SE), so wide grids shrink to fit instead of
// getting clipped by the container.
const MAX_GRID_WIDTH = 320
const STEP_MS = 320

export default function FarmGrid({ frames, characterEmoji = '🚜' }: FarmGridProps) {
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    if (frames.length <= 1) return
    const id = window.setInterval(() => {
      setFrameIndex((i) => {
        if (i >= frames.length - 1) {
          window.clearInterval(id)
          return i
        }
        return i + 1
      })
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [frames])

  const frame = frames[Math.min(frameIndex, frames.length - 1)]
  if (!frame) return null

  const cols = frame.grid[0]?.length ?? 1
  const gap = cols > 10 ? 2 : 4
  const cellSize = Math.max(
    MIN_CELL_SIZE,
    Math.min(MAX_CELL_SIZE, Math.floor((MAX_GRID_WIDTH - (cols - 1) * gap) / cols)),
  )
  const fontSize = Math.max(10, Math.round(cellSize * 0.5))

  return (
    <div className="mb-3 flex justify-center overflow-hidden rounded-xl bg-[#fafaf5] p-3">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gap: `${gap}px` }}
      >
        {frame.grid.map((row, y) =>
          row.map((cell, x) => {
            const hasTractor = x === frame.tractorX && y === frame.tractorY
            return (
              <div
                key={`${x}-${y}`}
                className="flex items-center justify-center rounded-md bg-[#e7ddc4]"
                style={{ width: cellSize, height: cellSize, fontSize }}
              >
                {hasTractor ? (
                  <span
                    className="inline-block"
                    style={{ transform: `rotate(${frame.tractorFacing}deg)` }}
                  >
                    {characterEmoji}
                  </span>
                ) : cell === 'recolte' ? (
                  '🌾'
                ) : cell === 'rocher' ? (
                  '🪨'
                ) : cell === 'arrivee' ? (
                  '🏁'
                ) : (
                  ''
                )}
              </div>
            )
          }),
        )}
      </div>
    </div>
  )
}
