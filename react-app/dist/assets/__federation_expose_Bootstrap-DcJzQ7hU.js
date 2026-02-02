import { importShared } from './__federation_fn_import-B4eSBueD.js';
import { c as clientExports, j as jsxRuntimeExports, A as App } from './App-BUncqn_9.js';

const React = await importShared('react');
console.log("=== React App Bootstrap ===");
console.log("React version:", React.version);
console.log("React object:", React);
console.log("React DOM version:", clientExports.createRoot.toString().includes("createRoot") ? "React 18+" : "React 16-17");
console.log("Window React:", window.React);
console.log("Window React DOM:", window["react-dom"]);
console.log("================================");
let root = null;
const mount = (el) => {
  if (!el) return;
  console.log("Mounting React App to:", el);
  console.log("Current React context:", React);
  root = clientExports.createRoot(el);
  root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
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
const bootstrap = { mount, unmount };

export { bootstrap as default, mount, unmount };
