// Loads Pyodide (Python compiled to WebAssembly), self-hosted under /pyodide/
// so PyQuest has no external CDN dependency and can run fully offline once
// the assets are cached by the service worker. Runs user code with stdout
// captured, so lessons can check what the learner's program prints.

const PYODIDE_BASE = `${import.meta.env.BASE_URL}pyodide/`

// Minimal shape of the pyodide instance we rely on.
interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>
  setStdout: (options: { batched: (msg: string) => void }) => void
  setStderr: (options: { batched: (msg: string) => void }) => void
  globals: { get: (name: string) => unknown }
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

export function getPyodide(): Promise<PyodideInterface> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await loadScript(`${PYODIDE_BASE}pyodide.js`)
      if (!window.loadPyodide) {
        throw new Error("L'interpréteur Python n'a pas pu démarrer.")
      }
      const pyodide = await window.loadPyodide({ indexURL: PYODIDE_BASE })
      return pyodide
    })()
  }
  return pyodidePromise
}

export interface RunResult {
  stdout: string
  error: string | null
  get: (name: string) => unknown
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

export async function runPython(code: string): Promise<RunResult> {
  const pyodide = await getPyodide()
  let buffer: string[] = []
  pyodide.setStdout({ batched: (msg: string) => buffer.push(msg) })
  pyodide.setStderr({ batched: () => {} })

  let error: string | null = null
  try {
    await pyodide.runPythonAsync(code)
  } catch (e) {
    error = friendlyError(e instanceof Error ? e.message : String(e))
  }

  return {
    stdout: buffer.join('\n'),
    error,
    get: (name: string) => {
      try {
        return pyToJs(pyodide.globals.get(name))
      } catch {
        return undefined
      }
    },
  }
}
