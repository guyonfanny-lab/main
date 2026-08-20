import { BADGES } from '../data/badges'

interface SuccessModalProps {
  message: string
  xpGained: number
  newBadgeIds: string[]
  isLastLesson: boolean
  finaleHeading: string
  onContinue: () => void
}

export default function SuccessModal({
  message,
  xpGained,
  newBadgeIds,
  isLastLesson,
  finaleHeading,
  onContinue,
}: SuccessModalProps) {
  const newBadges = BADGES.filter((b) => newBadgeIds.includes(b.id))

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center">
      <div className="animate-pop-in w-full max-w-md rounded-t-3xl bg-[#15151f] p-6 pb-[calc(24px+var(--safe-bottom))] shadow-2xl sm:rounded-3xl">
        <div className="mb-3 text-center text-5xl">{isLastLesson ? '🏆' : '🎉'}</div>
        <h2 className="mb-1 text-center text-lg font-extrabold text-white">
          {isLastLesson ? finaleHeading : 'Bravo, leçon réussie !'}
        </h2>
        <p className="mb-4 text-center text-sm text-white/60">{message}</p>

        {xpGained > 0 && (
          <div className="mb-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400/20 to-pink-500/20 py-2.5 text-amber-300">
            <span className="text-lg">✨</span>
            <span className="text-sm font-bold">+{xpGained} XP</span>
          </div>
        )}

        {newBadges.length > 0 && (
          <div className="mb-4 space-y-2">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-white/40">
              Nouveau badge{newBadges.length > 1 ? 's' : ''} !
            </p>
            {newBadges.map((b) => (
              <div
                key={b.id}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
              >
                <span className="text-2xl">{b.emoji}</span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white">{b.title}</p>
                  <p className="text-xs text-white/50">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-fuchsia-500/20 active:scale-[0.98]"
        >
          Continuer l'aventure →
        </button>
      </div>
    </div>
  )
}
