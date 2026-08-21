// A small per-game "function library": code the learner writes once and that
// then runs before every level's own code, so functions built in one level
// are automatically available in every later level of the same game —
// without having to re-paste them into each level's starter code.
const STORAGE_PREFIX = 'pyquest-library-'

export function loadLibrary(gameId: string): string | null {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${gameId}-v1`)
  } catch {
    return null
  }
}

export function saveLibrary(gameId: string, code: string): void {
  localStorage.setItem(`${STORAGE_PREFIX}${gameId}-v1`, code)
}
