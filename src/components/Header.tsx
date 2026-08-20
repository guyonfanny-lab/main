import { levelInfo } from '../lib/storage'
import XPBar from './XPBar'

interface HeaderProps {
  xp: number
  streak: number
}

export default function Header({ xp, streak }: HeaderProps) {
  const { level, xpIntoLevel, xpForNextLevel } = levelInfo(xp)
  return (
    <header
      className="sticky top-0 z-20 border-b border-white/10 bg-[#0b0b14]/90 px-4 pb-3 backdrop-blur"
      style={{ paddingTop: 'calc(var(--safe-top) + 12px)' }}
    >
      <div className="mx-auto flex max-w-md items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/20">
          {level}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-white/50">
            <span>Niveau {level}</span>
            <span>
              {xpIntoLevel} / {xpForNextLevel} XP
            </span>
          </div>
          <XPBar xpIntoLevel={xpIntoLevel} xpForNextLevel={xpForNextLevel} />
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-full bg-white/5 px-2.5 py-1.5 text-sm font-bold text-orange-300">
          <span>🔥</span>
          <span>{streak}</span>
        </div>
      </div>
    </header>
  )
}
