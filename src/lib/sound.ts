// Tiny WebAudio blips for feedback — no audio files to fetch, works offline,
// and only ever triggered from a user gesture (tap), which iOS allows.

let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq: number, start: number, duration: number, gain: number) {
  const audioCtx = getCtx()
  const osc = audioCtx.createOscillator()
  const g = audioCtx.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  g.gain.setValueAtTime(0, audioCtx.currentTime + start)
  g.gain.linearRampToValueAtTime(gain, audioCtx.currentTime + start + 0.01)
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + start + duration)
  osc.connect(g)
  g.connect(audioCtx.destination)
  osc.start(audioCtx.currentTime + start)
  osc.stop(audioCtx.currentTime + start + duration + 0.02)
}

export function playSuccess(enabled: boolean) {
  if (!enabled) return
  try {
    tone(523.25, 0, 0.12, 0.15)
    tone(659.25, 0.1, 0.12, 0.15)
    tone(783.99, 0.2, 0.22, 0.18)
  } catch {
    // audio unsupported/blocked — silently ignore
  }
}

export function playError(enabled: boolean) {
  if (!enabled) return
  try {
    tone(196, 0, 0.18, 0.12)
  } catch {
    // ignore
  }
}

export function playTap(enabled: boolean) {
  if (!enabled) return
  try {
    tone(880, 0, 0.05, 0.06)
  } catch {
    // ignore
  }
}
