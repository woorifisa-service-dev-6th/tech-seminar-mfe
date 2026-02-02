import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// React 인스턴스 감지 로그
console.log('=== React App Bootstrap ===');
console.log('React version:', React.version);
console.log('React object:', React);
console.log('React DOM version:', createRoot.toString().includes('createRoot') ? 'React 18+' : 'React 16-17');
console.log('Window React:', window.React);
console.log('Window React DOM:', window['react-dom']);
console.log('================================');

let root = null;

const mount = (el) => {
  if (!el) return;
  
  console.log('Mounting React App to:', el);
  console.log('Current React context:', React);
  
  root = createRoot(el);
  root.render(<App />);
  
  return () => {
    if (root) {
      root.unmount();
      root = null;
    }
  };
};

const unmount = () => {
  if (root) {
    root.unmount();
    root = null;
  }
};

export { mount, unmount };
export default { mount, unmount };