import { useEffect, useState } from 'react'
import type { DonjonCell, DonjonFrame } from '../types'

interface DonjonGridProps {
  frames: DonjonFrame[]
  characterEmoji?: string
}

const MAX_CELL_SIZE = 44
const MIN_CELL_SIZE = 16
const MAX_GRID_WIDTH = 320
const STEP_MS = 320

const MONSTER_HITS: Partial<Record<DonjonCell, number>> = {
  monstre1: 1,
  monstre2: 2,
  monstre3: 3,
}

function cellContent(cell: DonjonCell): string {
  if (cell.startsWith('monstre')) return '👹'
  switch (cell) {
    case 'mur':
      return '🧱'
    case 'cle':
      return '🔑'
    case 'porte':
      return '🚪'
    case 'coffre':
      return '💰'
    case 'sortie':
      return '🏁'
    default:
      return ''
  }
}

export default function DonjonGrid({ frames, characterEmoji = '🤖' }: DonjonGridProps) {
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
    <div className="mb-3 overflow-hidden rounded-xl bg-[#1c1730] p-3">
      <div className="mb-2 flex items-center justify-end gap-1 text-xs font-semibold text-amber-200">
        🔑 × {frame.cles}
      </div>
      <div className="flex justify-center">
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gap: `${gap}px` }}
        >
          {frame.grid.map((row, y) =>
            row.map((cell, x) => {
              const hasRobot = x === frame.robotX && y === frame.robotY
              const hits = MONSTER_HITS[cell]
              return (
                <div
                  key={`${x}-${y}`}
                  className="relative flex items-center justify-center rounded-md bg-[#2c2447]"
                  style={{ width: cellSize, height: cellSize, fontSize }}
                >
                  {hasRobot ? (
                    <span
                      className="inline-block"
                      style={{ transform: `rotate(${frame.robotFacing}deg)` }}
                    >
                      {characterEmoji}
                    </span>
                  ) : (
                    cellContent(cell)
                  )}
                  {!hasRobot && hits !== undefined && (
                    <span
                      className="absolute bottom-0 right-0.5 font-sans font-bold text-rose-300"
                      style={{ fontSize: Math.max(8, fontSize * 0.45) }}
                    >
                      {hits}
                    </span>
                  )}
                </div>
              )
            }),
          )}
        </div>
      </div>
    </div>
  )
}
