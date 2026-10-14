/* ============================================================
   IK SISTEMAS — INYECCIÓN DINÁMICA DE HEADER Y FOOTER
   ============================================================ */

(function () {
  const PARTIALS = {
    header: 'partials/header.html',
    footer: 'partials/footer.html',
  };

  async function loadPartial(url, mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`No se pudo cargar ${url}`);
      mount.innerHTML = await res.text();
    } catch (err) {
      console.error('[layout.js]', err);
    }
  }

  function markActivePage() {
    const path = window.location.pathname.split('/').pop() || '/';
    const pageKey = path.replace('.html', '') || 'inicio';

    const MAP = {
      'index':           'inicio',
      'servicios':       'servicios',
      'casos-de-exito':  'casos-de-exito',
      'invitaciones':    'invitaciones',
      'sobremi':         'sobre-mi',
      'contacto':        'contacto',
    };
    const activePath = MAP[pageKey] || pageKey;

    document
      .querySelectorAll(`#main-nav a[data-path], #mobile-menu a[href]`)
      .forEach((a) => {
        const dataPath = a.getAttribute('data-path');
        const href = a.getAttribute('href') || '';
        if (dataPath === activePath || href.includes(path)) {
          a.classList.add('bg-surface-container-high', 'text-primary', 'font-bold');
          a.classList.remove('text-on-surface-variant');
        }
      });
  }

  function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  }

  async function init() {
    await Promise.all([
      loadPartial(PARTIALS.header, 'site-header'),
      loadPartial(PARTIALS.footer, 'site-footer'),
    ]);
    markActivePage();
    setupMobileMenu();
    document.dispatchEvent(new CustomEvent('layout:ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();