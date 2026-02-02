import Home from './pages/home.js';
import ButtonPage from './pages/button.js';
import ColorPage from './pages/color.js';
import CounterPage from './pages/counter.js';

const routes = {
  '/': Home,
  '/button': ButtonPage,
  '/color': ColorPage,
  '/counter': CounterPage,
};

export function router() {
  const path = window.location.pathname;
  const page = routes[path] || Home;

  document.getElementById('app').innerHTML = page();
}