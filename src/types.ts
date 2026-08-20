export interface CheckResult {
  ok: boolean
  message: string
}

/** Shared shape for anything the learner codes against: a course lesson or a project step. */
export interface Exercise {
  id: string
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

export interface Lesson extends Exercise {
  moduleId: string
}

export interface Module {
  id: string
  title: string
  emoji: string
  description: string
  color: string
}

export interface ProjectStep extends Exercise {
  projectId: string
}

export type Difficulty = 'Débutant' | 'Intermédiaire' | 'Avancé'

export interface Project {
  id: string
  title: string
  emoji: string
  description: string
  difficulty: Difficulty
  color: string
  steps: ProjectStep[]
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
