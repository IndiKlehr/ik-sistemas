/* ============================================================
   IK SISTEMAS — SEGURIDAD CLIENTE
   Medidas para mitigar XSS, clickjacking, manipulación y
   fuga de datos. NO reemplaza la seguridad del servidor.
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. Anti-clickjacking: romper iframes
     ---------------------------------------------------------- */
  if (window.top !== window.self) {
    try {
      window.top.location = window.self.location;
    } catch (e) {
      document.documentElement.innerHTML = '';
    }
  }

  /* ----------------------------------------------------------
     2. Anti-DevTools-light (dificulta inspección casual)
     No bloquea DevTools real; solo disuade.
     ---------------------------------------------------------- */
  document.addEventListener('keydown', function (e) {
    // F12
    if (e.key === 'F12') e.preventDefault();
    // Ctrl+Shift+I / J / C
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
      e.preventDefault();
    }
    // Ctrl+U (ver código fuente)
    if (e.ctrlKey && e.key.toLowerCase() === 'u') {
      e.preventDefault();
    }
  });

  /* ----------------------------------------------------------
     3. Deshabilitar clic derecho (opcional, disuasivo)
     ---------------------------------------------------------- */
  document.addEventListener('contextmenu', function (e) {
    // Permitir clic derecho en inputs/textarea para pegar
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    e.preventDefault();
  });

  /* ----------------------------------------------------------
     4. Anti-arrastrar imágenes
     ---------------------------------------------------------- */
  document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  /* ----------------------------------------------------------
     5. Sanitización básica de parámetros GET
     Elimina etiquetas <script> y < en query strings.
     ---------------------------------------------------------- */
  (function sanitizeQueryString() {
    const url = new URL(window.location.href);
    let mutated = false;
    url.searchParams.forEach((value, key) => {
      if (/<|>|script|javascript:/i.test(value)) {
        url.searchParams.set(key, value.replace(/[<>]/g, ''));
        mutated = true;
      }
    });
    if (mutated) {
      window.history.replaceState({}, '', url.toString());
    }
  })();

  /* ----------------------------------------------------------
     6. Bloquear envío de formularios a dominios externos
     (Defensa contra secuestro de formularios)
     ---------------------------------------------------------- */
  document.addEventListener('submit', function (e) {
    const action = (e.target.getAttribute('action') || '').toLowerCase();
    if (action && !action.startsWith('/') && !action.includes(window.location.hostname)) {
      e.preventDefault();
      console.warn('[security.js] Envío a dominio externo bloqueado:', action);
    }
  }, true);

  /* ----------------------------------------------------------
     7. Marcar la ventana como "ya protegida" (evita doble init)
     ---------------------------------------------------------- */
  window.IK_SECURITY_ACTIVE = true;
})();