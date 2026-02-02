function Home() {
  return `
    <h1>Vanilla JS SPA</h1>
    <p>네비게이션을 눌러 기능을 체험해보세요.</p>
  `;
}

function ButtonPage() {
  return `
    <h1>Button Test</h1>
    <button id="testBtn">Click me</button>
    <p id="result"></p>
  `;
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'testBtn') {
    document.getElementById('result').textContent = '버튼이 클릭되었습니다!';
  }
});

let currentColor = 'rgb(255, 255, 255)';

function ColorPage() {
  return `
    <h1>Color Change</h1>
    <button id="colorBtn">Change Color</button>
    <div id="colorPreview" style="margin-top: 1.5rem;">
      <div id="colorBox" style="width: 200px; height: 200px; border: 2px solid #333; border-radius: 8px; background-color: rgb(255, 255, 255); transition: background-color 0.3s ease; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);"></div>
      <p id="colorValue" style="margin-top: 1rem; font-size: 16px; font-weight: bold; color: #333;">Current Color: rgb(255, 255, 255)</p>
    </div>
  `;
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'colorBtn') {
    currentColor = getRandomColor();
    
    const colorBox = document.getElementById('colorBox');
    const colorValue = document.getElementById('colorValue');
    
    if (colorBox) {
      colorBox.style.backgroundColor = currentColor;
    }
    if (colorValue) {
      colorValue.textContent = `Current Color: ${currentColor}`;
    }
  }
});

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

let count = 0;

function CounterPage() {
  return `
    <h1>Counter</h1>
    <p>Count: <span id="count">${count}</span></p>
    <button id="inc">+</button>
    <button id="dec">-</button>
  `;
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'inc') count++;
  if (e.target.id === 'dec') count--;

  const el = document.getElementById('count');
  if (el) el.textContent = count;
});

export { ButtonPage as B, CounterPage as C, Home as H, ColorPage as a };
