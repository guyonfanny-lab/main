import { useCallback, useEffect, useRef } from 'react'
import { buildGameSrcDoc, GAME_CANVAS_HEIGHT, GAME_CANVAS_WIDTH } from '../lib/jsSandbox'

export interface ConsoleLine {
  type: 'log' | 'error'
  text: string
}

interface GameCanvasProps {
  code: string
  /** Bumped by the parent on every "Lancer" click to force a clean iframe remount (fresh run). */
  runId: number
  onConsoleLine: (line: ConsoleLine) => void
  /** 'none' hides the on-screen D-pad for click/tap-driven games that don't use it. Defaults to 'dpad'. */
  controls?: 'dpad' | 'none'
  /** True for plain JS fundamentals exercises: the iframe still runs (for console output), but its canvas box and D-pad aren't shown — there's nothing to draw. */
  hidden?: boolean
}

interface TouchButtonProps {
  label: string
  big?: boolean
  onDown: () => void
  onUp: () => void
}

function TouchButton({ label, big, onDown, onUp }: TouchButtonProps) {
  return (
    <button
      type="button"
      onPointerDown={(e) => {
        e.preventDefault()
        onDown()
      }}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      onPointerCancel={onUp}
      onContextMenu={(e) => e.preventDefault()}
      style={{ touchAction: 'none' }}
      className={`flex select-none items-center justify-center rounded-xl bg-white/10 text-lg active:bg-white/25 ${
        big ? 'h-16 w-16 text-2xl' : 'h-11 w-11'
      }`}
    >
      {label}
    </button>
  )
}

export default function GameCanvas({ code, runId, onConsoleLine, controls = 'dpad', hidden = false }: GameCanvasProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (!iframeRef.current || e.source !== iframeRef.current.contentWindow) return
      const data = e.data as { type?: string; text?: string } | undefined
      if (data?.type === 'log' || data?.type === 'error') {
        onConsoleLine({ type: data.type, text: data.text ?? '' })
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onConsoleLine])

  const sendKey = useCallback((key: string, pressed: boolean) => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'input', key, pressed }, '*')
  }, [])

  const iframe = (
    <iframe
      key={runId}
      ref={iframeRef}
      srcDoc={buildGameSrcDoc(code)}
      sandbox="allow-scripts"
      title="Aperçu du jeu"
      style={{ width: GAME_CANVAS_WIDTH, height: GAME_CANVAS_HEIGHT, border: 0 }}
    />
  )

  if (hidden) {
    // Still mounted (and still runs) so console output is captured — just nothing to draw here.
    return <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>{iframe}</div>
  }

  return (
    <div className="mb-3">
      <div className="flex justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0f0f1a]">
        {iframe}
      </div>

      {controls === 'dpad' && (
        <>
          <div className="mt-3 flex items-center justify-between px-2">
            <div className="grid grid-cols-3 grid-rows-2 gap-1.5">
              <div />
              <TouchButton label="⬆️" onDown={() => sendKey('ArrowUp', true)} onUp={() => sendKey('ArrowUp', false)} />
              <div />
              <TouchButton
                label="⬅️"
                onDown={() => sendKey('ArrowLeft', true)}
                onUp={() => sendKey('ArrowLeft', false)}
              />
              <TouchButton
                label="⬇️"
                onDown={() => sendKey('ArrowDown', true)}
                onUp={() => sendKey('ArrowDown', false)}
              />
              <TouchButton
                label="➡️"
                onDown={() => sendKey('ArrowRight', true)}
                onUp={() => sendKey('ArrowRight', false)}
              />
            </div>
            <TouchButton big label="⏺" onDown={() => sendKey(' ', true)} onUp={() => sendKey(' ', false)} />
          </div>
          <p className="mt-1.5 text-center text-[10px] text-white/30">
            Flèches du clavier ou boutons tactiles — les deux fonctionnent.
          </p>
        </>
      )}
      {controls === 'none' && (
        <p className="mt-1.5 text-center text-[10px] text-white/30">Clique ou tape directement sur l'écran.</p>
      )}
    </div>
  )
}
