/* ============================================================
   IK SISTEMAS — MODAL DE INVITACIONES (Auto-inyectado)
   Se activa SOLO si existe <div id="modal-invitaciones-mount">
   Expone globalmente:
     - openDemoModal(type)  : 'wedding' | 'quince' | 'baptism'
     - closeDemoModal()
   ============================================================ */

(function () {
  const MOUNT_ID = 'modal-invitaciones-mount';
  const mount = document.getElementById(MOUNT_ID);
  if (!mount) return; // Página sin modal: salir silenciosamente.

  const MODAL_HTML = `
    <div id="demoModal" class="fixed inset-0 z-50 hidden bg-surface-overlay/95 backdrop-blur-2xl overflow-y-auto">
      <div class="sticky top-0 z-50 bg-surface-base/90 backdrop-blur-xl px-4 py-3 flex items-center justify-between shadow-lg">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-gold-amber animate-ping"></div>
          <div>
            <span class="font-headline-sm text-headline-sm text-text-primary block" id="modalDemoTitle">Demostración Interactiva</span>
            <span class="font-label-caps text-label-caps text-gold-light uppercase tracking-wider">IK Sistemas • Vista En Vivo</span>
          </div>
        </div>
        <button aria-label="Cerrar modal" type="button"
                class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-text-primary font-label-interactive transition-colors cursor-pointer"
                onclick="closeDemoModal()">
          <span class="material-symbols-outlined text-lg">close</span>
          <span class="hidden sm:inline">Cerrar Demo</span>
        </button>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-6 flex justify-center items-start">
        <div class="w-full max-w-md transition-all duration-500 rounded-3xl bg-surface shadow-2xl overflow-hidden p-2 sm:p-4" id="deviceContainer">

          <!-- DEMO 1: BODA -->
          <div class="hidden flex-col gap-6 text-text-primary" id="weddingDemoView">
            <div class="relative rounded-2xl overflow-hidden bg-surface-container text-center p-8 flex flex-col items-center">
              <div class="absolute inset-0 bg-gradient-to-b from-surface-base/90 via-surface-base/70 to-surface-base"></div>
              <div class="relative z-10 flex flex-col items-center">
                <span class="font-label-caps text-label-caps text-gold-light tracking-widest uppercase">Nuestra Boda</span>
                <h3 class="font-headline-lg text-headline-lg text-gold-light mt-2">Ana &amp; Juan</h3>
                <p class="font-body-default text-body-default text-text-secondary mt-1">Sábado, 14 de Noviembre de 2025</p>
                <div class="grid grid-cols-4 gap-2 mt-6 max-w-xs w-full">
                  <div class="bg-surface-container-high/90 backdrop-blur rounded-lg p-2.5 text-center"><span class="font-stat-metric text-stat-metric text-gold-light block">184</span><span class="font-label-caps text-label-caps text-text-muted">DÍAS</span></div>
                  <div class="bg-surface-container-high/90 backdrop-blur rounded-lg p-2.5 text-center"><span class="font-stat-metric text-stat-metric text-text-primary block">09</span><span class="font-label-caps text-label-caps text-text-muted">HS</span></div>
                  <div class="bg-surface-container-high/90 backdrop-blur rounded-lg p-2.5 text-center"><span class="font-stat-metric text-stat-metric text-text-primary block">42</span><span class="font-label-caps text-label-caps text-text-muted">MIN</span></div>
                  <div class="bg-surface-container-high/90 backdrop-blur rounded-lg p-2.5 text-center"><span class="font-stat-metric text-stat-metric text-gold-amber block">56</span><span class="font-label-caps text-label-caps text-text-muted">SEG</span></div>
                </div>
              </div>
            </div>
            <div class="p-5 rounded-2xl bg-surface-container-low shadow-md">
              <h4 class="font-headline-sm text-headline-sm text-text-primary">Confirmar Asistencia</h4>
              <p class="font-body-sm text-body-sm text-text-secondary mt-1">Por favor reconfirma antes del 20 de Octubre.</p>
              <button class="mt-4 w-full py-3 rounded-xl bg-gold-metallic hover:bg-gold-light text-surface-base font-label-interactive transition-all">
                Enviar Confirmación (Demo)
              </button>
            </div>
          </div>

          <!-- DEMO 2: 15 AÑOS -->
          <div class="hidden flex-col gap-6 text-text-primary" id="quinceDemoView">
            <div class="relative rounded-2xl overflow-hidden bg-surface-container text-center p-8 flex flex-col items-center">
              <div class="absolute inset-0 bg-gradient-to-b from-surface-base/90 via-surface-base/60 to-surface-base"></div>
              <div class="relative z-10 flex flex-col items-center">
                <span class="font-label-caps text-label-caps text-service-invitations tracking-widest uppercase">Mi Noche Inolvidable</span>
                <h3 class="font-headline-lg text-headline-lg text-text-primary mt-2">Mis 15 • Valentina</h3>
                <p class="font-body-default text-body-default text-service-invitations mt-1">Viernes, 28 de Noviembre • 21:30 Hs</p>
              </div>
            </div>
            <div class="p-5 rounded-2xl bg-surface-container-low">
              <h4 class="font-headline-sm text-headline-sm text-text-primary">Playlist Oficial</h4>
              <p class="font-body-sm text-body-sm text-text-secondary mt-1">Agregá tu canción favorita para el DJ.</p>
              <button class="mt-4 w-full py-3 rounded-xl bg-blue-electric hover:bg-surface-tint text-text-primary font-label-interactive transition-all">
                Conectar Spotify (Demo)
              </button>
            </div>
          </div>

          <!-- DEMO 3: BAUTISMO -->
          <div class="hidden flex-col gap-6 text-text-primary" id="baptismDemoView">
            <div class="relative rounded-2xl overflow-hidden bg-surface-container text-center p-8 flex flex-col items-center">
              <div class="absolute inset-0 bg-gradient-to-b from-surface-base/90 via-surface-base/70 to-surface-base"></div>
              <div class="relative z-10 flex flex-col items-center">
                <span class="font-label-caps text-label-caps text-blue-cyan tracking-widest uppercase">Celebración Sagrada</span>
                <h3 class="font-headline-lg text-headline-lg text-text-primary mt-2">Bautismo de Mateo</h3>
                <p class="font-body-default text-body-default text-blue-cyan mt-1">Domingo, 19 de Octubre • 11:00 Hs</p>
              </div>
            </div>
            <div class="p-5 rounded-2xl bg-surface-container-low">
              <h4 class="font-headline-sm text-headline-sm text-text-primary">Padrinos de Honor</h4>
              <div class="grid grid-cols-2 gap-3 mt-3">
                <div class="p-3 rounded-xl bg-surface-container text-center">
                  <span class="font-headline-sm text-text-primary text-sm block">Camila Klehr</span>
                  <span class="font-label-caps text-label-caps text-text-muted">Madrina</span>
                </div>
                <div class="p-3 rounded-xl bg-surface-container text-center">
                  <span class="font-headline-sm text-text-primary text-sm block">Lucas Ferreyra</span>
                  <span class="font-label-caps text-label-caps text-text-muted">Padrino</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-4 text-center">
            <a id="orderCurrentDemoBtn" class="w-full py-3.5 px-6 rounded-xl bg-gold-metallic hover:bg-gold-light text-surface-base font-label-interactive flex items-center justify-center gap-2 shadow-xl"
               href="https://wa.me/5493434165613" target="_blank" rel="noopener noreferrer">
              <span class="material-symbols-outlined text-xl">favorite</span>
              <span>Quiero una invitación así</span>
            </a>
            <p class="font-body-sm text-body-sm text-text-muted mt-2">Respuesta directa con Indira Klehr vía WhatsApp</p>
          </div>

        </div>
      </div>
    </div>
  `;

  mount.innerHTML = MODAL_HTML;

  const modal         = document.getElementById('demoModal');
  const weddingView   = document.getElementById('weddingDemoView');
  const quinceView    = document.getElementById('quinceDemoView');
  const baptismView   = document.getElementById('baptismDemoView');
  const modalTitle    = document.getElementById('modalDemoTitle');
  const orderBtn      = document.getElementById('orderCurrentDemoBtn');

  window.openDemoModal = function (type) {
    [weddingView, quinceView, baptismView].forEach((v) => {
      v.classList.add('hidden');
      v.classList.remove('flex');
    });

    if (type === 'wedding') {
      weddingView.classList.remove('hidden');
      weddingView.classList.add('flex');
      modalTitle.innerText = 'Demo: Boda de Gala (Ana & Juan)';
      orderBtn.href = 'https://wa.me/5493434165613?text=Hola%20Indira%2C%20quiero%20contratar%20la%20invitaci%C3%B3n%20de%20Boda.';
    } else if (type === 'quince') {
      quinceView.classList.remove('hidden');
      quinceView.classList.add('flex');
      modalTitle.innerText = 'Demo: Mis 15 Años (Valentina)';
      orderBtn.href = 'https://wa.me/5493434165613?text=Hola%20Indira%2C%20quiero%20contratar%20la%20invitaci%C3%B3n%20para%20Mis%2015.';
    } else if (type === 'baptism') {
      baptismView.classList.remove('hidden');
      baptismView.classList.add('flex');
      modalTitle.innerText = 'Demo: Bautismo (Mateo)';
      orderBtn.href = 'https://wa.me/5493434165613?text=Hola%20Indira%2C%20quiero%20contratar%20la%20invitaci%C3%B3n%20para%20Bautismo.';
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeDemoModal = function () {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      window.closeDemoModal();
    }
  });
})();