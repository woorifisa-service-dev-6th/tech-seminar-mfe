import { C as CounterPage, a as ColorPage, B as ButtonPage, H as Home } from './counter-MVqL8sZZ.js';

const routes = {
  '/': Home,
  '/button': ButtonPage,
  '/color': ColorPage,
  '/counter': CounterPage,
};

function router() {
  const path = window.location.pathname;
  const page = routes[path] || Home;

  document.getElementById('app').innerHTML = page();
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      history.pushState(null, '', e.target.href);
      router();
    }
  });

  window.addEventListener('popstate', router);
  router();
});
