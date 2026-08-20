export interface CheckResult {
  ok: boolean
  message: string
}

export interface Lesson {
  id: string
  moduleId: string
  title: string
  emoji: string
  xp: number
  /** Fun, story-flavored briefing shown above the editor. */
  intro: string
  /** Concrete task instructions. */
  task: string
  starterCode: string
  hints: string[]
  /** Runs after the user's code executes; inspects stdout + globals. */
  check: (stdout: string, get: (name: string) => unknown) => CheckResult
}

export interface Module {
  id: string
  title: string
  emoji: string
  description: string
  color: string
}

export interface Badge {
  id: string
  title: string
  emoji: string
  description: string
}

export interface Progress {
  xp: number
  completedLessons: Record<string, { xp: number; stars: number }>
  streak: number
  lastActiveDate: string | null
  earnedBadges: string[]
  soundOn: boolean
}
