/* ============================================================
   IK SISTEMAS — MODAL DE TÉRMINOS Y PRIVACIDAD
   Se auto-inyecta y se activa con el botón #btn-open-legal
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. Contenido legal
     ---------------------------------------------------------- */
  const LEGAL_CONTENT = {
    terminos: {
      title: 'Términos y Condiciones',
      updated: 'Última actualización: Octubre 2026',
      body: `
        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">1. Servicios ofrecidos</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          IK Sistemas, liderado por Klehr Indira Ayelén, ofrece servicios de desarrollo de software a medida, diseño y desarrollo de sitios web, identidad visual corporativa, invitaciones web interactivas y consultoría técnica. Cada proyecto se rige por una propuesta formal previa aprobada por el cliente.
        </p>

        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">2. Cotización y presupuesto</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          Toda cotización es gratuita y sin compromiso. El presupuesto final se define por escrito antes de iniciar el proyecto, detallando alcance, funcionalidades, plazos y forma de pago. Cualquier funcionalidad adicional no contemplada en el presupuesto inicial se cotiza aparte.
        </p>

        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">3. Formas de pago</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          El esquema estándar es <strong class="text-text-primary">50% de anticipo</strong> para reservar la ventana de producción y <strong class="text-text-primary">50% contra entrega</strong> y validación final. En proyectos de mayor escala se pueden acordar hitos de pago contra demo funcional de cada módulo. Aceptamos transferencia bancaria, Mercado Pago y métodos internacionales.
        </p>

        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">4. Plazos de entrega</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          Los plazos se acuerdan por escrito al inicio del proyecto. Pueden verse afectados por demoras en la entrega de materiales, contenidos o feedback por parte del cliente. En esos casos, el cronograma se ajusta en consecuencia.
        </p>

        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">5. Garantía y soporte</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          Toda entrega incluye <strong class="text-text-primary">30 días de garantía sin costo</strong> para ajustes finos, calibración en producción y corrección de errores. No cubre cambios de alcance ni nuevas funcionalidades. Convenios de mantenimiento continuo se cotizan por separado.
        </p>

        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">6. Propiedad intelectual</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          Una vez abonado el 100% del proyecto, el cliente adquiere la titularidad del código fuente, diseños y materiales entregados. IK Sistemas se reserva el derecho de mostrar el trabajo en su portfolio, salvo acuerdo de confidencialidad explícito.
        </p>

        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">7. Cancelaciones</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          El anticipo inicial no es reembolsable una vez iniciado el trabajo, ya que cubre horas de producción ya invertidas. En caso de cancelación por parte del cliente, se entrega el material producido hasta la fecha y se liquida el saldo proporcional al avance.
        </p>
      `,
    },
    privacidad: {
      title: 'Política de Privacidad',
      updated: 'Última actualización: Octubre 2026',
      body: `
        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">1. Qué datos recopilamos</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          Solo recopilamos los datos que el usuario nos proporciona voluntariamente al completar el formulario de contacto o al escribirnos por WhatsApp. Estos datos son: <strong class="text-text-primary">nombre, apellido y correo electrónico (opcional)</strong>, junto con el detalle de la consulta.
        </p>

        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">2. Para qué usamos esos datos</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          Los datos se usan exclusivamente para <strong class="text-text-primary">contactarte y responder tu consulta</strong> por WhatsApp o correo electrónico. No se utilizan para fines publicitarios, no se comparten con terceros y no se venden bajo ninguna circunstancia.
        </p>

        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">3. Dónde se guardan los datos</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          El formulario de contacto <strong class="text-text-primary">no almacena los datos en ninguna base de datos propia</strong>. La información se envía directamente a WhatsApp o al correo electrónico, y queda en esas plataformas bajo sus propias políticas de privacidad.
        </p>

        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">4. Cuánto tiempo conservamos los datos</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          No conservamos copias adicionales de tus datos en servidores propios. Las conversaciones de WhatsApp y los correos electrónicos quedan en tus respectivas cuentas hasta que vos decidas eliminarlos.
        </p>

        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">5. Tus derechos</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          Podés solicitarnos en cualquier momento:
        </p>
        <ul class="list-disc list-inside font-body-default text-body-default text-text-secondary leading-relaxed mb-4 space-y-1.5 ml-2">
          <li>Acceder a los datos que nos hayas proporcionado.</li>
          <li>Rectificar cualquier dato incorrecto.</li>
          <li>Eliminar toda la información que tengamos sobre vos.</li>
          <li>Retirar tu consentimiento en cualquier momento.</li>
        </ul>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          Para ejercer estos derechos, escribinos a <a href="mailto:indiklehr@gmail.com" class="text-blue-cyan hover:text-gold-light transition-colors underline">indiklehr@gmail.com</a>.
        </p>

        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">6. Cookies y rastreo</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          Este sitio <strong class="text-text-primary">no utiliza cookies de rastreo, píxeles publicitarios ni herramientas de analítica que recopilen datos personales</strong>. No hay rastreo de terceros ni publicidad.
        </p>

        <h3 class="font-headline-sm text-headline-sm text-text-primary mt-6 mb-3">7. Cambios en esta política</h3>
        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mb-4">
          Cualquier cambio en esta política será publicado en esta misma página con la fecha de actualización correspondiente. Te recomendamos revisarla periódicamente.
        </p>

        <p class="font-body-default text-body-default text-text-secondary leading-relaxed mt-8 pt-6 border-t border-surface-container-high">
          <strong class="text-text-primary">Responsable:</strong> Klehr Indira Ayelén — IK Sistemas<br>
          <strong class="text-text-primary">Contacto:</strong> <a href="mailto:indiklehr@gmail.com" class="text-blue-cyan hover:text-gold-light transition-colors underline">indiklehr@gmail.com</a>
        </p>
      `,
    },
  };

  /* ----------------------------------------------------------
     2. HTML del modal
     ---------------------------------------------------------- */
  const MODAL_HTML = `
    <div id="legalModal"
         class="fixed inset-0 z-[200] hidden bg-surface-base/90 backdrop-blur-xl items-center justify-center p-4 sm:p-8"
         role="dialog" aria-modal="true" aria-labelledby="legalModalTitle">

      <div class="relative w-full max-w-3xl max-h-[90vh] rounded-2xl bg-surface-container border border-white/5 shadow-2xl overflow-hidden flex flex-col">

        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-surface-container-high bg-surface-container-lowest/80">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gold-metallic/15 text-gold-metallic flex items-center justify-center">
              <span class="material-symbols-outlined text-xl">gavel</span>
            </div>
            <div>
              <h2 id="legalModalTitle" class="font-headline-sm text-headline-sm text-text-primary">Información Legal</h2>
              <p class="font-body-sm text-body-sm text-text-muted">Términos de servicio y política de privacidad</p>
            </div>
          </div>

          <button type="button"
                  id="legalModalClose"
                  aria-label="Cerrar"
                  class="w-10 h-10 rounded-full bg-surface-container-high hover:bg-surface-bright text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer">
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <!-- Pestañas -->
        <div class="px-6 py-3 bg-surface-container-high/60 flex items-center gap-2 overflow-x-auto border-b border-surface-container-high">
          <button type="button"
                  class="legal-tab px-4 py-2 rounded-lg font-label-interactive text-label-interactive transition-all cursor-pointer"
                  data-tab="terminos">
            Términos
          </button>
          <button type="button"
                  class="legal-tab px-4 py-2 rounded-lg font-label-interactive text-label-interactive transition-all cursor-pointer"
                  data-tab="privacidad">
            Privacidad
          </button>
        </div>

        <!-- Contenido -->
        <div class="flex-1 overflow-y-auto px-6 py-6">
          <div class="legal-panel" data-panel="terminos"></div>
          <div class="legal-panel hidden" data-panel="privacidad"></div>
        </div>

      </div>
    </div>
  `;

  /* ----------------------------------------------------------
     3. Inyectar modal
     ---------------------------------------------------------- */
  if (!document.getElementById('legalModal')) {
    document.body.insertAdjacentHTML('beforeend', MODAL_HTML);
  }

  /* ----------------------------------------------------------
     4. Referencias
     ---------------------------------------------------------- */
  const modal    = document.getElementById('legalModal');
  const btnOpen  = document.getElementById('btn-open-legal');
  const btnClose = document.getElementById('legalModalClose');
  const tabs     = modal.querySelectorAll('.legal-tab');
  const panels   = modal.querySelectorAll('.legal-panel');

  /* ----------------------------------------------------------
     5. Rellenar paneles con contenido
     ---------------------------------------------------------- */
  panels.forEach((panel) => {
    const key = panel.dataset.panel;
    const content = LEGAL_CONTENT[key];
    if (!content) return;
    panel.innerHTML = `
      <p class="font-label-caps text-label-caps text-gold-metallic uppercase tracking-widest mb-1">${content.title}</p>
      <p class="font-body-sm text-body-sm text-text-muted mb-2">${content.updated}</p>
      ${content.body}
    `;
  });

  /* ----------------------------------------------------------
     6. Cambiar de pestaña
     ---------------------------------------------------------- */
  function activateTab(tabName) {
    tabs.forEach((t) => {
      const isActive = t.dataset.tab === tabName;
      if (isActive) {
        t.className = 'legal-tab px-4 py-2 rounded-lg font-label-interactive text-label-interactive transition-all cursor-pointer bg-surface-elevated text-primary font-semibold shadow-sm';
      } else {
        t.className = 'legal-tab px-4 py-2 rounded-lg font-label-interactive text-label-interactive transition-all cursor-pointer text-text-secondary hover:text-text-primary hover:bg-surface-container';
      }
    });

    panels.forEach((p) => {
      p.classList.toggle('hidden', p.dataset.panel !== tabName);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });

  /* ----------------------------------------------------------
     7. Abrir / cerrar modal
     ---------------------------------------------------------- */
  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    activateTab('terminos');
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // Cerrar con el botón X (existe desde que se inyectó el modal)
  if (btnClose) {
    btnClose.addEventListener('click', closeModal);
  }

  // ─── DELEGACIÓN DE EVENTOS ───────────────────────────
  // En vez de engancharnos al botón (que puede no existir todavía),
  // escuchamos TODOS los clics del documento y filtramos.
  // Así funciona sin importar cuándo se inyecte el footer.
  document.addEventListener('click', (e) => {
    // ¿El clic fue en el botón de abrir? (o dentro de él)
    const btn = e.target.closest('#btn-open-legal');
    if (btn) {
      e.preventDefault();
      openModal();
      return;
    }

    // ¿El clic fue en el backdrop del modal?
    if (e.target === modal) {
      closeModal();
    }
  });

  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Marcar como cargado (útil para debug)
  window.LEGAL_MODAL_LOADED = true;

})();