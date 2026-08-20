import { useEffect, useState } from 'react'
import type { FarmFrame } from '../types'

interface FarmGridProps {
  frames: FarmFrame[]
}

const CELL_SIZE = 44
const STEP_MS = 320

export default function FarmGrid({ frames }: FarmGridProps) {
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

  return (
    <div className="mb-3 flex justify-center overflow-hidden rounded-xl bg-[#fafaf5] p-3">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${frame.grid[0]?.length ?? 1}, ${CELL_SIZE}px)` }}
      >
        {frame.grid.map((row, y) =>
          row.map((cell, x) => {
            const hasTractor = x === frame.tractorX && y === frame.tractorY
            return (
              <div
                key={`${x}-${y}`}
                className="flex items-center justify-center rounded-md bg-[#e7ddc4] text-xl"
                style={{ width: CELL_SIZE, height: CELL_SIZE }}
              >
                {hasTractor ? (
                  <span
                    className="inline-block"
                    style={{ transform: `rotate(${frame.tractorFacing}deg)` }}
                  >
                    🚜
                  </span>
                ) : cell === 'recolte' ? (
                  '🌾'
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
