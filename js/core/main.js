/* ============================================================
   IK SISTEMAS — UTILIDADES GLOBALES
   ============================================================ */

(function () {
  'use strict';

  function initFaqAccordions() {
    document.querySelectorAll('.faq-item').forEach((item) => {
      const toggle = item.querySelector('.faq-toggle');
      if (!toggle) return;
      toggle.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        document.querySelectorAll('.faq-item').forEach((other) => {
          if (other !== item) other.classList.remove('is-open');
        });
        item.classList.toggle('is-open', !isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id || id === '#' || id.length < 2) return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  window.IK = window.IK || {};
  window.IK.WHATSAPP = '5493434165613';
  window.IK.buildWhatsAppUrl = function (message) {
    return `https://wa.me/${window.IK.WHATSAPP}?text=${encodeURIComponent(message)}`;
  };

  function updateYear() {
    document.querySelectorAll('[data-current-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  function init() {
    initFaqAccordions();
    initSmoothScroll();
    updateYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();