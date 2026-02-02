import { C as CounterPage, a as ColorPage, B as ButtonPage, H as Home } from './counter-MVqL8sZZ.js';

const remotesMap = {
'remoteWidget':{url:'http://localhost:5004/assets/remoteEntry.js',format:'esm',from:'vite'},
  'remoteDraw':{url:'http://localhost:5005/assets/remoteEntry.js',format:'esm',from:'vite'}
};
                
                function merge(obj1, obj2) {
                  const mergedObj = Object.assign(obj1, obj2);
                  for (const key of Object.keys(mergedObj)) {
                    if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                      mergedObj[key] = merge(mergedObj[key], obj2[key]);
                    }
                  }
                  return mergedObj;
                }

                const wrapShareModule = remoteFrom => {
                  return merge({
                    
                  }, (globalThis.__federation_shared__ || {})['default'] || {});
                };

                async function __federation_method_ensure(remoteId) {
                    const remote = remotesMap[remoteId];
                    if (!remote.inited) {
                        if (['esm', 'systemjs'].includes(remote.format)) {
                            // loading js with import(...)
                            return new Promise((resolve, reject) => {
                                const getUrl = () => Promise.resolve(remote.url);
                                getUrl().then(url => {
                                    import(/* @vite-ignore */ url).then(lib => {
                                        if (!remote.inited) {
                                            const shareScope = wrapShareModule();
                                            lib.init(shareScope);
                                            remote.lib = lib;
                                            remote.lib.init(shareScope);
                                            remote.inited = true;
                                        }
                                        resolve(remote.lib);
                                    }).catch(reject);
                                });
                            })
                        }
                    } else {
                        return remote.lib;
                    }
                }

                function __federation_method_wrapDefault(module, need) {
                    if (!module?.default && need) {
                        let obj = Object.create(null);
                        obj.default = module;
                        obj.__esModule = true;
                        return obj;
                    }
                    return module;
                }

                function __federation_method_getRemote(remoteName, componentName) {
                    return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
                }

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
        const remoteModule = await __federation_method_getRemote("remoteDraw" , "./draw").then(module=>__federation_method_wrapDefault(module, true)); 
        
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
const bootstrap = { mount, unmount };

export { bootstrap as default, mount, unmount };
