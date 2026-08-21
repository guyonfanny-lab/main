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

export type FarmCell = 'vide' | 'recolte' | 'rocher' | 'arrivee'

/** One frame of the tractor grid, snapshotted after every farm action for a step-by-step replay. */
export interface FarmFrame {
  grid: FarmCell[][]
  tractorX: number
  tractorY: number
  tractorFacing: number
}

/** Initial layout for a farm-grid exercise (see lib/pyodide.ts). */
export interface FarmConfig {
  width: number
  height: number
  cells: FarmCell[][]
  startX: number
  startY: number
  startFacing: number
}

/** monstre1/2/3 = a monster requiring that many attaquer() hits to clear. */
export type DonjonCell =
  | 'vide'
  | 'mur'
  | 'monstre1'
  | 'monstre2'
  | 'monstre3'
  | 'cle'
  | 'porte'
  | 'coffre'
  | 'sortie'

/** One frame of the dungeon grid, snapshotted after every robot action for a step-by-step replay. */
export interface DonjonFrame {
  grid: DonjonCell[][]
  robotX: number
  robotY: number
  robotFacing: number
  cles: number
}

/** Initial layout for a dungeon-grid exercise (see lib/pyodide.ts). */
export interface DonjonConfig {
  width: number
  height: number
  cells: DonjonCell[][]
  startX: number
  startY: number
  startFacing: number
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
  /** Initial tractor-grid layout, if this exercise controls the farm tractor instead of (or alongside) the turtle. */
  farmConfig?: FarmConfig
  /** Initial dungeon-grid layout, if this exercise controls the dungeon robot. */
  donjonConfig?: DonjonConfig
  /** Emoji shown for the grid character, when farmConfig or donjonConfig is set. Defaults to the tractor. */
  characterEmoji?: string
  /** Shows the persistent function-library editor above the code, injected before this exercise's code on every run. */
  usesLibrary?: string
  /**
   * Runs after the user's code executes; inspects stdout, globals, turtle drawing, and the
   * farm/dungeon grid's final frame. `code` (the raw source) is only passed for JavaScript game
   * levels, whose checks read source patterns instead of a deterministic run trace.
   */
  check: (
    stdout: string,
    get: (name: string) => unknown,
    commands: DrawCommand[],
    farmFrames: FarmFrame[],
    donjonFrames: DonjonFrame[],
    code?: string,
  ) => CheckResult
}

export interface Lesson extends Exercise {
  moduleId: string
}

/** One level of the standalone "Donjon" game (flat list, like Lesson but with no module and an optional chapter label). */
export interface DonjonLevel extends Exercise {
  chapter: string
}

/** One level of a "Jeux" game track: real JavaScript + Canvas, live-tested in a sandboxed iframe. */
export interface GameStep extends Exercise {
  trackId: string
  /** 'none' hides the on-screen D-pad for click/tap-driven games (Morpion, Simon...) that don't use it. Defaults to 'dpad'. */
  controls?: 'dpad' | 'none'
}

/** One standalone algorithmic challenge in the "Défis" tab. */
export interface Challenge extends Exercise {
  difficulty: Difficulty
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

/** One game in the "Jeux" tab — picked freely like a Project, not gated behind the others. */
export interface GameTrack {
  id: string
  title: string
  emoji: string
  description: string
  difficulty: Difficulty
  color: string
  steps: GameStep[]
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
