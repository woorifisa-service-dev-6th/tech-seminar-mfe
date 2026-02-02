import Home from './pages/home.js';
import ButtonPage from './pages/button.js';
import ColorPage from './pages/color.js';
import CounterPage from './pages/counter.js';

const routes = {
  '/': Home,
  '/button': ButtonPage,
  '/color': ColorPage,
  '/counter': CounterPage,
  '/draw': () => '<div id="draw-remote-area" style="width:100%; min-height:300px;">그림판 로딩 중...</div>', 
};

const mount = async (el) => { 
  if (!el) return;
  
  const nav = document.createElement('nav');
  nav.style.cssText = 'padding: 1rem; background: #333; border-bottom: 2px solid #666; display: flex; gap: 10px;';
  
  const links = [
    { href: '#/', text: 'Home' },
    { href: '#/button', text: 'Button' },
    { href: '#/color', text: 'Color' },
    { href: '#/counter', text: 'Counter' },
    { href: '#/draw', text: 'Drawing' }, 
  ];
  
  links.forEach(({ href, text }) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    a.style.cssText = 'color: white; text-decoration: none; padding: 5px 10px; border-radius: 4px; transition: background 0.2s;';
    a.onmouseover = () => a.style.background = '#444';
    a.onmouseout = () => a.style.background = 'transparent';
    a.onclick = (e) => {
      e.preventDefault();
      window.location.hash = href;
      handleNavigation();
    };
    nav.appendChild(a);
  });
  
  const appContainer = document.createElement('div');
  appContainer.style.cssText = 'min-height: 500px; padding: 2rem; background: #f9f9f9; border-radius: 8px; margin: 1rem; color: #333;';
  
  const content = document.createElement('div');
  content.id = 'app';
  
  appContainer.appendChild(content);
  el.appendChild(nav);
  el.appendChild(appContainer);
  
  const handleNavigation = async () => {
    const path = window.location.hash.slice(1) || '/';
    const page = routes[path] || Home;
    content.innerHTML = page();

    // /draw 경로에 진입했을 때만 실행
    if (path === '/draw') {
      try {
        // 비어있는 draw-remote-area 먼저 그려놓고, 그 안에 그림판을 5005에서 호출
        const remoteModule = await import('remoteDraw/draw'); 
        
        // mountDraw : 가져온 함수 실행하며, 바닐라 앱이 제공한 target 위에 그림판 UI 렌더링
        const mountDraw = remoteModule.mountDraw || 
                          (remoteModule.default && remoteModule.default.mountDraw) || 
                          remoteModule.default;

        const target = document.getElementById('draw-remote-area');
        
        if (target && typeof mountDraw === 'function') {
          target.innerHTML = ''; 
          mountDraw(target); // 5005번의 그림판을 실행합니다.
        } else {
          throw new Error("mountDraw 함수를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("그림판 로드 실패 상세:", err);
        const target = document.getElementById('draw-remote-area');
        if (target) target.innerHTML = `<div style="color:red;">그림판 앱 로드 실패: ${err.message}</div>`;
      }
    }
  };
  
  window.addEventListener('hashchange', handleNavigation);
  handleNavigation();
  
  return () => {
    window.removeEventListener('hashchange', handleNavigation);
    el.innerHTML = ''; 
  };
};

const unmount = () => {};

export { mount, unmount };
export default { mount, unmount };