import type { Progress } from '../types'
import { evaluateBadges } from '../data/badges'

const STORAGE_KEY = 'pyquest-progress-v1'

const DEFAULT_PROGRESS: Progress = {
  xp: 0,
  completedLessons: {},
  streak: 0,
  lastActiveDate: null,
  earnedBadges: [],
  soundOn: true,
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

function yesterdayKey(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_PROGRESS }
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_PROGRESS, ...parsed }
  } catch {
    return { ...DEFAULT_PROGRESS }
  }
}

export function saveProgress(progress: Progress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

/** Updates the daily streak. Returns the updated progress (not yet saved). */
function bumpStreak(progress: Progress): Progress {
  const today = todayKey()
  if (progress.lastActiveDate === today) return progress
  const wasYesterday = progress.lastActiveDate === yesterdayKey()
  return {
    ...progress,
    streak: wasYesterday ? progress.streak + 1 : 1,
    lastActiveDate: today,
  }
}

export const XP_PER_LEVEL = 100

export function levelInfo(xp: number) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1
  const xpIntoLevel = xp % XP_PER_LEVEL
  return { level, xpIntoLevel, xpForNextLevel: XP_PER_LEVEL }
}

export interface CompleteLessonResult {
  progress: Progress
  newlyEarnedBadges: string[]
  xpGained: number
  alreadyDone: boolean
}

export function completeLesson(
  progress: Progress,
  lessonId: string,
  xp: number,
): CompleteLessonResult {
  const alreadyDone = !!progress.completedLessons[lessonId]
  let next: Progress = {
    ...progress,
    completedLessons: alreadyDone
      ? progress.completedLessons
      : { ...progress.completedLessons, [lessonId]: { xp, stars: 1 } },
    xp: alreadyDone ? progress.xp : progress.xp + xp,
  }
  next = bumpStreak(next)
  const newlyEarnedBadges = evaluateBadges(next)
  if (newlyEarnedBadges.length > 0) {
    next = { ...next, earnedBadges: [...next.earnedBadges, ...newlyEarnedBadges] }
  }
  saveProgress(next)
  return { progress: next, newlyEarnedBadges, xpGained: alreadyDone ? 0 : xp, alreadyDone }
}

export function toggleSound(progress: Progress): Progress {
  const next = { ...progress, soundOn: !progress.soundOn }
  saveProgress(next)
  return next
}

export function resetProgress(): Progress {
  saveProgress(DEFAULT_PROGRESS)
  return { ...DEFAULT_PROGRESS }
}
