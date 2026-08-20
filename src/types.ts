export interface CheckResult {
  ok: boolean
  message: string
}

/** One line segment drawn by the turtle-graphics bridge (see lib/pyodide.ts). */
export interface DrawCommand {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  width: number
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
  /** Shows an (initially empty) drawing canvas before the code has even run, so it's obvious one is coming. */
  visual?: boolean
  /** Runs after the user's code executes; inspects stdout, globals, and anything drawn by the turtle. */
  check: (stdout: string, get: (name: string) => unknown, commands: DrawCommand[]) => CheckResult
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
