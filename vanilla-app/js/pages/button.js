export default function ButtonPage() {
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