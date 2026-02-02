let count = 0;

export default function CounterPage() {
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