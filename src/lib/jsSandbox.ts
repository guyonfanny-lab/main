// Builds the sandboxed iframe document that runs a learner's JavaScript game
// code. The iframe has `sandbox="allow-scripts"` with no `allow-same-origin`,
// so it gets a unique opaque origin: it cannot read the app's localStorage,
// cookies, or DOM, and cannot navigate the parent window — only run scripts
// and paint its own canvas. `canvas`/`ctx` are pre-created (like the turtle
// bridge's `avancer`/`couleur` globals), plus a few small helpers so lessons
// can build a real, playable game with plain Canvas 2D + requestAnimationFrame.

export const GAME_CANVAS_WIDTH = 300
export const GAME_CANVAS_HEIGHT = 400

// Keeps a learner's stray `</script>` inside a string literal (e.g. console.log("</script>"))
// from prematurely closing our wrapping <script> tag.
function escapeForInlineScript(code: string): string {
  return code.replace(/<\/script/gi, '<\\/script')
}

export function buildGameSrcDoc(userCode: string): string {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body { margin: 0; padding: 0; background: #0f0f1a; overflow: hidden; height: 100%; }
  canvas { display: block; touch-action: none; }
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<script>
(function () {
  var canvas = document.getElementById('canvas');
  var LOGICAL_W = ${GAME_CANVAS_WIDTH};
  var LOGICAL_H = ${GAME_CANVAS_HEIGHT};
  var dpr = window.devicePixelRatio || 1;
  canvas.width = LOGICAL_W * dpr;
  canvas.height = LOGICAL_H * dpr;
  canvas.style.width = LOGICAL_W + 'px';
  canvas.style.height = LOGICAL_H + 'px';
  var ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  window.canvas = canvas;
  window.ctx = ctx;

  // ---- input: real keyboard + synthetic key events posted by the parent's on-screen buttons ----
  var keysDown = new Set();
  var GAME_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '];
  window.estAppuyee = function (touche) { return keysDown.has(touche); };
  window.addEventListener('keydown', function (e) {
    keysDown.add(e.key);
    if (GAME_KEYS.indexOf(e.key) !== -1) e.preventDefault();
  });
  window.addEventListener('keyup', function (e) { keysDown.delete(e.key); });
  window.addEventListener('message', function (e) {
    var data = e.data;
    if (!data || data.type !== 'input') return;
    if (data.pressed) keysDown.add(data.key); else keysDown.delete(data.key);
  });

  // ---- small helpers ----
  window.hasard = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };
  window.collision = function (x1, y1, l1, h1, x2, y2, l2, h2) {
    return x1 < x2 + l2 && x1 + l1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  };

  // ---- relay console + errors to the parent's console panel ----
  function post(type, text) {
    try { parent.postMessage({ type: type, text: String(text) }, '*'); } catch (err) { /* ignore */ }
  }
  var origLog = console.log;
  console.log = function () {
    var parts = Array.prototype.slice.call(arguments).map(function (a) {
      try { return typeof a === 'object' ? JSON.stringify(a) : String(a); } catch (e) { return String(a); }
    });
    post('log', parts.join(' '));
    origLog.apply(console, arguments);
  };
  window.onerror = function (message) {
    post('error', message);
    return true;
  };
  window.addEventListener('unhandledrejection', function (e) {
    post('error', (e.reason && e.reason.message) || String(e.reason));
  });

  try {
    ${escapeForInlineScript(userCode)}
  } catch (err) {
    post('error', err && err.message ? err.message : String(err));
  }
})();
</script>
</body>
</html>`
}
