interface XPBarProps {
  xpIntoLevel: number
  xpForNextLevel: number
}

export default function XPBar({ xpIntoLevel, xpForNextLevel }: XPBarProps) {
  const pct = Math.min(100, Math.round((xpIntoLevel / xpForNextLevel) * 100))
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-pink-500 transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
