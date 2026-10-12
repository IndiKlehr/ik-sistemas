/* ============================================================
   IK SISTEMAS — FORMULARIO DE CONTACTO
   - Sanitización en vivo (anti-XSS, anti-inyección)
   - Permite espacios, saltos de línea y tildes en la consulta
   - Validación por campo con feedback visual
   - Cartelito de error debajo del botón
   - Botón deshabilitado hasta que todo esté OK
   - Envío por WhatsApp con mensaje pre-armado
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     UTILIDADES DE SANITIZACIÓN
     ---------------------------------------------------------- */

  /**
   * Sanitiza texto de un input simple (nombre, apellido, email).
   * Quita < >, javascript:, on*=. NO permite saltos de línea.
   */
  function sanitizeInput(str) {
    return String(str)
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '') // quita controles EXCEPTO \t (09) y \n (0A)
      .replace(/\s+/g, ' ')   // colapsa espacios múltiples en uno solo
      .trim();
  }

  /**
   * Sanitiza texto de un textarea (consulta).
   * Permite saltos de línea (\n), tabs (\t) y espacios múltiples.
   * NO permite < >, javascript:, on*=.
   */
  function sanitizeTextarea(str) {
    return String(str)
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '') // quita controles EXCEPTO \t y \n
      .replace(/\n{3,}/g, '\n\n')  // colapsa 3+ saltos seguidos en 2
      .trim();
  }

  function isValidEmail(str) {
    if (!str) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }

  /**
   * Aplica sanitización en vivo.
   * @param {HTMLInputElement|HTMLTextAreaElement} el
   * @param {'input'|'textarea'} type
   */
  function attachLiveSanitizer(el, type) {
    if (!el) return;
    const sanitizer = type === 'textarea' ? sanitizeTextarea : sanitizeInput;

    el.addEventListener('input', () => {
      const original = el.value;
      const cleaned  = sanitizer(original);

      if (cleaned !== original) {
        const cursorPos = el.selectionStart;
        el.value = cleaned;
        // Restaurar cursor lo más cerca posible
        const diff = original.length - cleaned.length;
        const newPos = Math.max(0, cursorPos - diff);
        try { el.setSelectionRange(newPos, newPos); } catch (e) {}
      }
    });
  }

  /* ----------------------------------------------------------
     INICIALIZACIÓN
     ---------------------------------------------------------- */
  function initContactForm() {
    const form           = document.getElementById('contactConfigurator');
    const btnSend        = document.getElementById('btnSendWhatsApp');
    const inputName      = document.getElementById('clientName');
    const inputLastName  = document.getElementById('clientLastName');
    const inputEmail     = document.getElementById('clientEmail');
    const inputDetails   = document.getElementById('projectDetails');
    const charCounter    = document.getElementById('charCounter');

    const captchaBox       = document.getElementById('captchaBox');
    const captchaCheckbox  = document.getElementById('captchaCheckbox');
    const captchaCheckIcon = document.getElementById('captchaCheckIcon');
    const captchaBadge     = document.getElementById('captchaBadge');
    const captchaVerified  = document.getElementById('captchaVerified');

    const feedback       = document.getElementById('formFeedback');
    const feedbackIcon   = document.getElementById('formFeedbackIcon');
    const feedbackTitle  = document.getElementById('formFeedbackTitle');
    const feedbackMsg    = document.getElementById('formFeedbackMsg');

    if (!form || !btnSend) return;

    let isVerified = false;

    /* --------------------------------------------------------
       1. Sanitización en vivo
       -------------------------------------------------------- */
    attachLiveSanitizer(inputName,     'input');
    attachLiveSanitizer(inputLastName, 'input');
    attachLiveSanitizer(inputEmail,    'input');
    attachLiveSanitizer(inputDetails,  'textarea');

    /* --------------------------------------------------------
       2. Contador de caracteres
       -------------------------------------------------------- */
    if (charCounter && inputDetails) {
      const updateCounter = () => {
        charCounter.textContent = `${inputDetails.value.length} / 800`;
      };
      inputDetails.addEventListener('input', updateCounter);
      updateCounter();
    }

    /* --------------------------------------------------------
       3. Feedback visual (cartelito)
       -------------------------------------------------------- */
    function showFeedback(type, title, msg) {
      const styles = {
        error:   { box: 'bg-red-500/10 border-red-500/30',         icon: 'text-red-400',    sym: 'error' },
        info:    { box: 'bg-blue-cyan/10 border-blue-cyan/30',     icon: 'text-blue-cyan',  sym: 'info' },
        success: { box: 'bg-emerald-500/10 border-emerald-500/30', icon: 'text-emerald-400', sym: 'check_circle' },
      };
      const s = styles[type] || styles.error;
      feedback.className = `flex items-start gap-3 p-4 rounded-xl border transition-all ${s.box}`;
      feedbackIcon.className = `material-symbols-outlined text-lg shrink-0 mt-0.5 ${s.icon}`;
      feedbackIcon.textContent = s.sym;
      feedbackTitle.textContent = title;
      feedbackMsg.textContent = msg;
    }

    function hideFeedback() {
      feedback.className = 'hidden items-start gap-3 p-4 rounded-xl border transition-all';
    }

    /* --------------------------------------------------------
       4. Validación por campo
       -------------------------------------------------------- */
    function validateName() {
      const v = sanitizeInput(inputName.value);
      if (!v) return { ok: false, msg: 'Ingresá tu nombre para continuar.' };
      if (v.length < 2) return { ok: false, msg: 'El nombre debe tener al menos 2 letras.' };
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'.-]+$/.test(v)) return { ok: false, msg: 'El nombre solo admite letras y espacios.' };
      return { ok: true };
    }

    function validateLastName() {
      const v = sanitizeInput(inputLastName.value);
      if (!v) return { ok: false, msg: 'Ingresá tu apellido para continuar.' };
      if (v.length < 2) return { ok: false, msg: 'El apellido debe tener al menos 2 letras.' };
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'.-]+$/.test(v)) return { ok: false, msg: 'El apellido solo admite letras y espacios.' };
      return { ok: true };
    }

    function validateEmail() {
      const v = sanitizeInput(inputEmail.value);
      if (!v) return { ok: true };
      if (!isValidEmail(v)) return { ok: false, msg: 'El correo ingresado no parece válido.' };
      return { ok: true };
    }

    function validateDetails() {
      const v = sanitizeTextarea(inputDetails.value);
      if (!v) return { ok: false, msg: 'Contame tu consulta para poder ayudarte.' };
      if (v.length < 10) return { ok: false, msg: 'La consulta debe tener al menos 10 caracteres.' };
      return { ok: true };
    }

    /* --------------------------------------------------------
       5. Validar todo
       -------------------------------------------------------- */
    function validateAll(options = {}) {
      const showErrors = options.showErrors === true;

      const nameR     = validateName();
      const lastNameR = validateLastName();
      const emailR    = validateEmail();
      const detailsR  = validateDetails();

      const firstError =
        (!nameR.ok     && nameR)     ||
        (!lastNameR.ok && lastNameR) ||
        (!detailsR.ok  && detailsR)  ||
        (!emailR.ok    && emailR)    ||
        null;

      const allOk = nameR.ok && lastNameR.ok && emailR.ok && detailsR.ok;

      if (!isVerified) {
        return { ok: false, reason: 'captcha', fieldsOk: allOk, error: firstError };
      }

      if (!allOk) {
        if (showErrors && firstError) {
          showFeedback('error', 'Revisá los datos', firstError.msg);
        } else if (showErrors) {
          showFeedback('error', 'Faltan datos', 'Completá todos los campos para continuar.');
        }
        return { ok: false, reason: 'fields', error: firstError };
      }

      return { ok: true };
    }

    /* --------------------------------------------------------
       6. Refrescar estado
       -------------------------------------------------------- */
    function refreshState(showErrors = false) {
      const result = validateAll({ showErrors });

      if (result.ok) {
        btnSend.removeAttribute('disabled');
        hideFeedback();
        return;
      }

      btnSend.setAttribute('disabled', 'disabled');

      if (result.reason === 'captcha') {
        if (result.fieldsOk) {
          showFeedback('info', 'Falta un paso', 'Marcá la casilla "No soy un robot" para continuar.');
        } else if (showErrors && result.error && result.error.msg) {
          showFeedback('error', 'Revisá los datos', result.error.msg);
        }
      }
      // Si es reason === 'fields' y showErrors, el cartel ya se mostró en validateAll
    }

    /* --------------------------------------------------------
       7. Listeners de inputs
       -------------------------------------------------------- */
    [inputName, inputLastName, inputEmail, inputDetails].forEach((el) => {
      if (!el) return;
      el.addEventListener('input', () => refreshState(false));
      el.addEventListener('blur',  () => refreshState(true));
    });

    /* --------------------------------------------------------
       8. Captcha
       -------------------------------------------------------- */
    function verifyCaptcha() {
      if (isVerified) return;
      isVerified = true;

      captchaBox.classList.add('hidden');
      captchaVerified.classList.remove('hidden');
      captchaVerified.classList.add('flex');

      captchaCheckbox.classList.add('bg-emerald-500', 'border-emerald-500');
      captchaCheckIcon.classList.remove('opacity-0');
      captchaBadge.textContent = 'OK';

      refreshState(false);
    }

    if (captchaBox) {
      captchaBox.addEventListener('click', verifyCaptcha);
      captchaBox.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          verifyCaptcha();
        }
      });
    }

    /* --------------------------------------------------------
       9. Envío por WhatsApp
       -------------------------------------------------------- */
    btnSend.addEventListener('click', () => {
      const result = validateAll({ showErrors: true });
      if (!result.ok) {
        refreshState(true);
        return;
      }

      const data = {
        name:     sanitizeInput(inputName.value),
        lastName: sanitizeInput(inputLastName.value),
        email:    sanitizeInput(inputEmail.value),
        details:  sanitizeTextarea(inputDetails.value),
      };

      const fullName = `${data.name} ${data.lastName}`.trim();
      let msg = `Hola Indira! Soy *${fullName}*.\n\n`;
      msg += `📝 *Consulta:*\n"${data.details}"\n`;
      if (data.email) msg += `\n✉️ *Correo:* ${data.email}`;
      msg += `\n\n_Enviado desde iksistemas.com_`;

      const url = `https://wa.me/5493434165613?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      btnSend.click();
    });

    /* --------------------------------------------------------
       10. Estado inicial
       -------------------------------------------------------- */
    refreshState(false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();