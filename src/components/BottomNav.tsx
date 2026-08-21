export type Tab = 'path' | 'projects' | 'donjon' | 'games' | 'challenges' | 'profile'

interface BottomNavProps {
  active: Tab
  onChange: (tab: Tab) => void
}

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'path', label: 'Parcours', emoji: '🗺️' },
  { id: 'projects', label: 'Projets', emoji: '🛠️' },
  { id: 'donjon', label: 'Donjon', emoji: '🏰' },
  { id: 'games', label: 'Jeux', emoji: '🎮' },
  { id: 'challenges', label: 'Défis', emoji: '🧩' },
  { id: 'profile', label: 'Profil', emoji: '🧑‍🚀' },
]

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav
      className="sticky bottom-0 z-20 border-t border-white/10 bg-[#0b0b14]/95 backdrop-blur"
      style={{ paddingBottom: 'var(--safe-bottom)' }}
    >
      <div className="mx-auto flex max-w-md">
        {TABS.map((tab) => {
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors ${
                isActive ? 'text-white' : 'text-white/40'
              }`}
            >
              <span className={`text-xl transition-transform ${isActive ? 'scale-110' : ''}`}>
                {tab.emoji}
              </span>
              {tab.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
