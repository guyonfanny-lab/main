// Keeps whatever the learner has typed for each exercise, so leaving a
// lesson (or finishing it) never throws away in-progress code.
const STORAGE_KEY = 'pyquest-code-v1'

function loadAll(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function loadSavedCode(exerciseId: string): string | null {
  const all = loadAll()
  return typeof all[exerciseId] === 'string' ? all[exerciseId] : null
}

export function saveCode(exerciseId: string, code: string): void {
  const all = loadAll()
  all[exerciseId] = code
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function clearAllSavedCode(): void {
  localStorage.removeItem(STORAGE_KEY)
}
