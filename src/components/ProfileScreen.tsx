import { BADGES } from '../data/badges'
import { LESSONS } from '../data/curriculum'
import { levelInfo } from '../lib/storage'
import type { Progress } from '../types'

interface ProfileScreenProps {
  progress: Progress
  onToggleSound: () => void
  onReset: () => void
}

export default function ProfileScreen({ progress, onToggleSound, onReset }: ProfileScreenProps) {
  const { level, xpIntoLevel, xpForNextLevel } = levelInfo(progress.xp)
  const completedCount = Object.keys(progress.completedLessons).length

  return (
    <div className="mx-auto max-w-md px-4 pb-10 pt-5">
      <h1 className="mb-5 text-xl font-extrabold text-white">Ton profil</h1>

      <div className="mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 p-5 text-center">
        <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-2xl font-extrabold text-white shadow-lg">
          {level}
        </div>
        <p className="text-sm font-semibold text-white">Niveau {level}</p>
        <p className="text-xs text-white/50">
          {progress.xp} XP au total · {xpIntoLevel}/{xpForNextLevel} vers le niveau {level + 1}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-white/5 p-3 text-center">
          <p className="text-lg font-extrabold text-orange-300">🔥 {progress.streak}</p>
          <p className="text-[10px] text-white/40">jours de suite</p>
        </div>
        <div className="rounded-xl bg-white/5 p-3 text-center">
          <p className="text-lg font-extrabold text-emerald-300">
            {completedCount}/{LESSONS.length}
          </p>
          <p className="text-[10px] text-white/40">leçons</p>
        </div>
        <div className="rounded-xl bg-white/5 p-3 text-center">
          <p className="text-lg font-extrabold text-amber-300">{progress.earnedBadges.length}</p>
          <p className="text-[10px] text-white/40">badges</p>
        </div>
      </div>

      <h2 className="mb-3 text-sm font-bold text-white/80">Badges</h2>
      <div className="mb-8 grid grid-cols-2 gap-2.5">
        {BADGES.map((badge) => {
          const earned = progress.earnedBadges.includes(badge.id)
          return (
            <div
              key={badge.id}
              className={`rounded-xl border p-3 ${
                earned
                  ? 'border-amber-300/30 bg-amber-300/10'
                  : 'border-white/5 bg-white/[0.03] opacity-50'
              }`}
            >
              <div className="mb-1 text-2xl">{earned ? badge.emoji : '🔒'}</div>
              <p className="text-xs font-bold text-white">{badge.title}</p>
              <p className="text-[10px] leading-snug text-white/40">{badge.description}</p>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onToggleSound}
        className="mb-2.5 w-full rounded-xl bg-white/5 py-3 text-sm font-semibold text-white/80 active:bg-white/10"
      >
        {progress.soundOn ? '🔊 Son activé' : '🔇 Son coupé'}
      </button>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-xl bg-rose-500/10 py-3 text-sm font-semibold text-rose-300 active:bg-rose-500/20"
      >
        Réinitialiser ma progression
      </button>
    </div>
  )
}
