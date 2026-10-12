/* ============================================================
   IK SISTEMAS — LIGHTBOX
   Amplía imágenes o videos del carrusel al hacer clic.
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. HTML del lightbox
     ---------------------------------------------------------- */
  const LIGHTBOX_HTML = `
    <div id="ikLightbox"
         class="fixed inset-0 z-[200] hidden bg-surface-base/95 backdrop-blur-xl items-center justify-center p-4 sm:p-8 select-none"
         role="dialog" aria-modal="true" aria-label="Vista ampliada">

      <button type="button" id="ikLightboxClose" aria-label="Cerrar"
              class="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-surface-container-high/80 hover:bg-surface-bright backdrop-blur-md text-text-primary flex items-center justify-center transition-all cursor-pointer">
        <span class="material-symbols-outlined text-2xl">close</span>
      </button>

      <span id="ikLightboxCounter"
            class="absolute top-4 left-4 z-30 px-3 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md text-text-primary font-label-caps text-label-caps">
        1 / 1
      </span>

      <button type="button" id="ikLightboxPrev" aria-label="Anterior"
              class="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-surface-container-high/80 hover:bg-surface-bright backdrop-blur-md text-text-primary flex items-center justify-center transition-all cursor-pointer">
        <span class="material-symbols-outlined text-2xl">chevron_left</span>
      </button>

      <button type="button" id="ikLightboxNext" aria-label="Siguiente"
              class="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-surface-container-high/80 hover:bg-surface-bright backdrop-blur-md text-text-primary flex items-center justify-center transition-all cursor-pointer">
        <span class="material-symbols-outlined text-2xl">chevron_right</span>
      </button>

      <img id="ikLightboxImage" src="" alt=""
           class="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 opacity-0 hidden">

      <video id="ikLightboxVideo" src="" controls autoplay playsinline
             class="max-w-full max-h-full rounded-lg shadow-2xl transition-opacity duration-300 opacity-0 hidden">
      </video>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', LIGHTBOX_HTML);

  /* ----------------------------------------------------------
     2. Referencias y estado
     ---------------------------------------------------------- */
  const lightbox  = document.getElementById('ikLightbox');
  const imgEl     = document.getElementById('ikLightboxImage');
  const videoEl   = document.getElementById('ikLightboxVideo');
  const counter   = document.getElementById('ikLightboxCounter');
  const btnClose  = document.getElementById('ikLightboxClose');
  const btnPrev   = document.getElementById('ikLightboxPrev');
  const btnNext   = document.getElementById('ikLightboxNext');

  let currentSlides = [];   // [{ type: 'image'|'video', src }]
  let currentIndex  = 0;

  /* ----------------------------------------------------------
     3. Abrir / cerrar
     ---------------------------------------------------------- */
  function open(slides, index) {
    currentSlides = slides.slice();
    currentIndex  = index;

    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';

    render();
  }

  function close() {
    imgEl.classList.add('opacity-0');
    videoEl.classList.add('opacity-0');

    // Pausar el video al cerrar
    try { videoEl.pause(); } catch (e) {}

    setTimeout(() => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      document.body.style.overflow = '';

      // Limpiar src para liberar memoria
      videoEl.removeAttribute('src');
      videoEl.load();
    }, 200);
  }

  function render() {
    if (currentSlides.length === 0) return;
    const slide = currentSlides[currentIndex];

    // Ocultar ambos
    imgEl.classList.add('opacity-0', 'hidden');
    videoEl.classList.add('opacity-0', 'hidden');

    // Pausar el video si estaba sonando
    try { videoEl.pause(); } catch (e) {}

    if (slide.type === 'image') {
      imgEl.src = slide.src;
      imgEl.alt = `Imagen ${currentIndex + 1}`;
      requestAnimationFrame(() => {
        imgEl.classList.remove('hidden');
        requestAnimationFrame(() => imgEl.classList.remove('opacity-0'));
      });
    } else if (slide.type === 'video') {
      videoEl.src = slide.src;
      videoEl.load();
      requestAnimationFrame(() => {
        videoEl.classList.remove('hidden');
        requestAnimationFrame(() => {
          videoEl.classList.remove('opacity-0');
          videoEl.play().catch(() => {});
        });
      });
    }

    counter.textContent = `${currentIndex + 1} / ${currentSlides.length}`;

    // Ocultar flechas si hay un solo slide
    if (currentSlides.length <= 1) {
      btnPrev.style.display = 'none';
      btnNext.style.display = 'none';
    } else {
      btnPrev.style.display = 'flex';
      btnNext.style.display = 'flex';
    }
  }

  function next() {
    currentIndex = (currentIndex + 1) % currentSlides.length;
    render();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length;
    render();
  }

  /* ----------------------------------------------------------
     4. Listeners
     ---------------------------------------------------------- */
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  btnNext.addEventListener('click', (e) => { e.stopPropagation(); next(); });

  lightbox.addEventListener('click', (e) => {
    // Cerrar solo si se hizo clic en el backdrop (no en la imagen/video/botones)
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
  });

  // Swipe táctil
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next(); else prev();
    }
  }, { passive: true });

  /* ----------------------------------------------------------
     5. Delegación: clic en carrusel → lightbox
     ---------------------------------------------------------- */
  document.addEventListener('click', (e) => {
    // Detectar clic en imagen O en video del carrusel
    const target = e.target.closest('.carousel-image, .carousel-video');
    if (!target) return;

    const carousel = target.closest('.carousel');
    if (!carousel) return;

    // Armar la lista de slides (video primero si existe, después imágenes)
    const slides = [];
    const videoSrc = carousel.dataset.video;
    let images = [];
    try {
      images = JSON.parse(carousel.dataset.images || '[]');
    } catch (err) {}

    if (videoSrc) slides.push({ type: 'video', src: videoSrc });
    images.forEach((src) => slides.push({ type: 'image', src }));

    if (slides.length === 0) return;

    // Detectar índice actual
    let index = 0;
    if (target.classList.contains('carousel-video')) {
      index = 0;
    } else if (videoSrc) {
      // Es imagen y hay video: buscar por src
      const currentSrc = (target.getAttribute('src') || '').split('/').pop();
      const imgIndex = images.findIndex((src) => src.split('/').pop() === currentSrc);
      index = imgIndex >= 0 ? imgIndex + 1 : 0;
    } else {
      const currentSrc = (target.getAttribute('src') || '').split('/').pop();
      const imgIndex = images.findIndex((src) => src.split('/').pop() === currentSrc);
      index = imgIndex >= 0 ? imgIndex : 0;
    }

    open(slides, index);
  });

  /* ----------------------------------------------------------
     6. Cursor pointer
     ---------------------------------------------------------- */
  const style = document.createElement('style');
  style.textContent = `
    .carousel-image,
    .carousel-video { cursor: zoom-in; transition: opacity .4s ease, transform .3s ease; }
    .carousel-image:hover,
    .carousel-video:hover { transform: scale(1.02); }
    .carousel-video { pointer-events: auto; }
  `;
  document.head.appendChild(style);
})();