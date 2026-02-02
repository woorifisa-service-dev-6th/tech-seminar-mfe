import { router } from './router.js';

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