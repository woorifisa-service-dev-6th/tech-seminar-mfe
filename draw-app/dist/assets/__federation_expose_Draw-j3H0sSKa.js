// draw-app/js/draw.js

// 반드시 명시적으로 export const mountDraw 라고 써주어야 합니다.
const mountDraw = (el) => {
  if (!el) return;
  el.innerHTML = `
  <h1>Drawing Test</h1>
      <canvas id="remote-canvas" width="300" height="200" style="border: 2px solid #333; padding: 10px; background: #fff; border-radius: 8px; dotted #ccc; cursor:crosshair;"></canvas>
      <br><button id="draw-clear">Clear</button>
  `;

  const canvas = el.querySelector('#remote-canvas');
  const ctx = canvas.getContext('2d');
  let drawing = false;

  canvas.onmousedown = () => drawing = true;
  canvas.onmouseup = () => { drawing = false; ctx.beginPath(); };
  canvas.onmousemove = (e) => {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };
  el.querySelector('#draw-clear').onclick = () => ctx.clearRect(0,0,300,200);
};

export { mountDraw };
