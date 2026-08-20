// Loads Pyodide (Python compiled to WebAssembly), self-hosted under /pyodide/
// so PyQuest has no external CDN dependency and can run fully offline once
// the assets are cached by the service worker. Runs user code with stdout
// captured, so lessons can check what the learner's program prints.
import type { DrawCommand, FarmCell, FarmConfig, FarmFrame } from '../types'

const PYODIDE_BASE = `${import.meta.env.BASE_URL}pyodide/`

// Minimal shape of the pyodide instance we rely on.
interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>
  setStdout: (options: { batched: (msg: string) => void }) => void
  setStderr: (options: { batched: (msg: string) => void }) => void
  globals: { get: (name: string) => unknown; set: (name: string, value: unknown) => void }
}

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideInterface>
  }
}

let pyodidePromise: Promise<PyodideInterface> | null = null

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Impossible de charger l'interpréteur Python."))
    document.head.appendChild(script)
  })
}

// ---------------------------------------------------------------------------
// Turtle graphics bridge: a handful of French-named drawing primitives that
// get injected into Python's global namespace, so lessons can draw on a
// canvas instead of only printing text. State lives here in JS (simpler and
// faster than round-tripping through Python) and resets before every run.
// ---------------------------------------------------------------------------
const COLOR_NAMES: Record<string, string> = {
  rouge: '#ef4444',
  bleu: '#3b82f6',
  vert: '#22c55e',
  jaune: '#eab308',
  orange: '#f97316',
  violet: '#a855f7',
  rose: '#ec4899',
  noir: '#111827',
  blanc: '#f9fafb',
  marron: '#92400e',
  gris: '#6b7280',
  cyan: '#06b6d4',
}

const turtle = {
  x: 0,
  y: 0,
  angle: 0, // degrees, 0 = facing up on screen; positive = clockwise (right turns)
  penDown: true,
  color: '#111827',
  width: 3,
  commands: [] as DrawCommand[],
}

function resetTurtle() {
  turtle.x = 0
  turtle.y = 0
  turtle.angle = 0
  turtle.penDown = true
  turtle.color = '#111827'
  turtle.width = 3
  turtle.commands = []
}

function moveForward(distance: number) {
  const rad = (turtle.angle * Math.PI) / 180
  const dx = Math.sin(rad) * distance
  const dy = -Math.cos(rad) * distance
  const x2 = turtle.x + dx
  const y2 = turtle.y + dy
  if (turtle.penDown) {
    turtle.commands.push({ x1: turtle.x, y1: turtle.y, x2, y2, color: turtle.color, width: turtle.width })
  }
  turtle.x = x2
  turtle.y = y2
}

function registerTurtleApi(pyodide: PyodideInterface) {
  pyodide.globals.set('avancer', (distance: number) => moveForward(distance))
  pyodide.globals.set('reculer', (distance: number) => moveForward(-distance))
  pyodide.globals.set('tourner_droite', (angle: number) => {
    turtle.angle += angle
  })
  pyodide.globals.set('tourner_gauche', (angle: number) => {
    turtle.angle -= angle
  })
  pyodide.globals.set('leve_stylo', () => {
    turtle.penDown = false
  })
  pyodide.globals.set('baisse_stylo', () => {
    turtle.penDown = true
  })
  pyodide.globals.set('epaisseur', (n: number) => {
    turtle.width = n
  })
  pyodide.globals.set('couleur', (nom: string) => {
    turtle.color = COLOR_NAMES[nom] ?? nom
  })
}

// ---------------------------------------------------------------------------
// Farm-tractor bridge: a little grid-world à la "The Farmer Was Replaced" —
// deplacer/pivoter/recolter primitives that move a tractor around a grid of
// cells, snapshotting a frame after every action so the UI can replay the
// whole run step by step instead of only showing the end state.
// ---------------------------------------------------------------------------
const DEFAULT_FARM_CONFIG: FarmConfig = {
  width: 1,
  height: 1,
  cells: [['vide']],
  startX: 0,
  startY: 0,
  startFacing: 90,
}

function cloneGrid(grid: FarmCell[][]): FarmCell[][] {
  return grid.map((row) => [...row])
}

const farm = {
  width: 1,
  height: 1,
  grid: [['vide']] as FarmCell[][],
  x: 0,
  y: 0,
  facing: 90,
  frames: [] as FarmFrame[],
}

function snapshotFarm() {
  farm.frames.push({
    grid: cloneGrid(farm.grid),
    tractorX: farm.x,
    tractorY: farm.y,
    tractorFacing: farm.facing,
  })
}

function resetFarm(config?: FarmConfig) {
  const cfg = config ?? DEFAULT_FARM_CONFIG
  farm.width = cfg.width
  farm.height = cfg.height
  farm.grid = cloneGrid(cfg.cells)
  farm.x = cfg.startX
  farm.y = cfg.startY
  farm.facing = cfg.startFacing
  farm.frames = []
  snapshotFarm()
}

function farmAheadCoords(): { nx: number; ny: number } {
  const rad = (farm.facing * Math.PI) / 180
  return {
    nx: farm.x + Math.round(Math.sin(rad)),
    ny: farm.y + Math.round(-Math.cos(rad)),
  }
}

function farmDeplacer() {
  const { nx, ny } = farmAheadCoords()
  const inBounds = nx >= 0 && nx < farm.width && ny >= 0 && ny < farm.height
  if (inBounds && farm.grid[ny][nx] !== 'rocher') {
    farm.x = nx
    farm.y = ny
  }
  snapshotFarm()
}

function farmPivoter(delta: number) {
  farm.facing = (farm.facing + delta + 360) % 360
  snapshotFarm()
}

function farmRecolter() {
  if (farm.grid[farm.y][farm.x] === 'recolte') {
    farm.grid[farm.y][farm.x] = 'vide'
  }
  snapshotFarm()
}

function farmPlanter() {
  if (farm.grid[farm.y][farm.x] === 'vide') {
    farm.grid[farm.y][farm.x] = 'recolte'
  }
  snapshotFarm()
}

function farmCaseRecoltable(): boolean {
  return farm.grid[farm.y][farm.x] === 'recolte'
}

function farmCaseLibre(): boolean {
  const { nx, ny } = farmAheadCoords()
  if (nx < 0 || nx >= farm.width || ny < 0 || ny >= farm.height) return false
  return farm.grid[ny][nx] !== 'rocher'
}

function registerFarmApi(pyodide: PyodideInterface) {
  pyodide.globals.set('deplacer', () => farmDeplacer())
  pyodide.globals.set('pivoter_droite', () => farmPivoter(90))
  pyodide.globals.set('pivoter_gauche', () => farmPivoter(-90))
  pyodide.globals.set('recolter', () => farmRecolter())
  pyodide.globals.set('planter', () => farmPlanter())
  pyodide.globals.set('case_recoltable', () => farmCaseRecoltable())
  pyodide.globals.set('case_libre', () => farmCaseLibre())
}

export function getPyodide(): Promise<PyodideInterface> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await loadScript(`${PYODIDE_BASE}pyodide.js`)
      if (!window.loadPyodide) {
        throw new Error("L'interpréteur Python n'a pas pu démarrer.")
      }
      const pyodide = await window.loadPyodide({ indexURL: PYODIDE_BASE })
      registerTurtleApi(pyodide)
      registerFarmApi(pyodide)
      return pyodide
    })()
  }
  return pyodidePromise
}

export interface RunResult {
  stdout: string
  error: string | null
  get: (name: string) => unknown
  commands: DrawCommand[]
  farmFrames: FarmFrame[]
}

function pyToJs(value: unknown): unknown {
  if (value && typeof value === 'object' && 'toJs' in value) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (value as any).toJs()
    } catch {
      return value
    }
  }
  return value
}

function friendlyError(raw: string): string {
  const lines = raw.trim().split('\n')
  const last = lines[lines.length - 1] ?? raw
  return last.replace(/^\w*Error:?\s*/, (m) => m)
}

export async function runPython(code: string, farmConfig?: FarmConfig): Promise<RunResult> {
  const pyodide = await getPyodide()
  let buffer: string[] = []
  pyodide.setStdout({ batched: (msg: string) => buffer.push(msg) })
  pyodide.setStderr({ batched: () => {} })
  resetTurtle()
  resetFarm(farmConfig)

  let error: string | null = null
  try {
    await pyodide.runPythonAsync(code)
  } catch (e) {
    error = friendlyError(e instanceof Error ? e.message : String(e))
  }

  return {
    stdout: buffer.join('\n'),
    error,
    commands: [...turtle.commands],
    farmFrames: [...farm.frames],
    get: (name: string) => {
      try {
        return pyToJs(pyodide.globals.get(name))
      } catch {
        return undefined
      }
    },
  }
}
