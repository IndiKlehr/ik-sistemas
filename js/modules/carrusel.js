/* ============================================================
   IK SISTEMAS — CARRUSEL DE IMÁGENES Y VIDEOS
   Auto-inicializa todos los .carousel de la página.

   Atributos:
   - data-images: JSON array de URLs de imágenes
   - data-video: URL de un video (opcional). Si existe,
                 se muestra como primer slide.
   - data-autoplay: milisegundos entre cambios (0 = sin autoplay)

   Comportamiento:
   - Video: autoplay, muted, loop, playsinline
   - Imágenes: fade in/out
   - Autoplay del carrusel: se pausa al pasar mouse o interactuar
   ============================================================ */

(function () {
  'use strict';

  function initCarousel(el) {
    // Parsear imágenes
    let images = [];
    try {
      images = JSON.parse(el.dataset.images || '[]');
    } catch (e) {
      console.warn('[carrusel] data-images inválido', e);
      return;
    }

    // Video opcional (va primero)
    const videoSrc = el.dataset.video || null;

    // Construir lista de slides
    const slides = [];
    if (videoSrc) slides.push({ type: 'video', src: videoSrc });
    images.forEach((src) => slides.push({ type: 'image', src }));

    if (slides.length === 0) return;

    const viewport   = el.querySelector('.carousel-viewport');
    const btnPrev    = el.querySelector('.carousel-prev');
    const btnNext    = el.querySelector('.carousel-next');
    const dotsWrap   = el.querySelector('.carousel-dots');
    const counterEl  = el.querySelector('.carousel-counter');
    const videoBadge = el.querySelector('.carousel-video-badge');

    if (!viewport) return;

    let currentIndex = 0;
    let autoplayMs   = parseInt(el.dataset.autoplay, 10);
    if (isNaN(autoplayMs)) autoplayMs = 5000;

    let autoplayTimer = null;
    let paused = false;

    // Pre-cargar imágenes (el video se carga solo cuando aparece)
    images.forEach((src) => { const img = new Image(); img.src = src; });

    /* --- Crear elementos para cada tipo de slide --- */
    // Imagen principal (ya está en el HTML)
    let imgEl = el.querySelector('.carousel-image');
    if (!imgEl) {
      imgEl = document.createElement('img');
      imgEl.className = 'carousel-image w-full h-full object-cover transition-opacity duration-500 absolute inset-0 opacity-0';
      imgEl.alt = '';
      viewport.appendChild(imgEl);
    }

    // Video (se crea dinámicamente, oculto por defecto)
    let videoEl = null;
    if (videoSrc) {
      videoEl = document.createElement('video');
      videoEl.className = 'carousel-video w-full h-full object-cover transition-opacity duration-500 absolute inset-0 opacity-0';
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.preload = 'metadata';
      videoEl.setAttribute('muted', '');
      videoEl.setAttribute('playsinline', '');
      videoEl.src = videoSrc;
      viewport.appendChild(videoEl);
    }

    /* --- Render --- */
    function render(index) {
      currentIndex = (index + slides.length) % slides.length;
      const slide = slides[currentIndex];

      // Ocultar todo
      imgEl.classList.add('opacity-0');
      if (videoEl) videoEl.classList.add('opacity-0');

      // Mostrar el que corresponde
      if (slide.type === 'image') {
        imgEl.src = slide.src;
        // Forzar un frame para que la transición funcione
        requestAnimationFrame(() => imgEl.classList.remove('opacity-0'));

        if (videoEl) {
          try { videoEl.pause(); } catch (e) {}
        }
        if (videoBadge) videoBadge.style.display = 'none';
      } else if (slide.type === 'video' && videoEl) {
        // Play del video
        videoEl.currentTime = 0;
        const playPromise = videoEl.play();
        if (playPromise && playPromise.catch) {
          // Si el navegador bloquea autoplay, no hacemos nada
          playPromise.catch(() => {});
        }
        requestAnimationFrame(() => videoEl.classList.remove('opacity-0'));

        if (videoBadge) videoBadge.style.display = 'flex';
      }

      // Actualizar puntitos
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.carousel-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }

      // Actualizar contador
      if (counterEl) {
        counterEl.textContent = `${currentIndex + 1} / ${slides.length}`;
      }
    }

    /* --- Puntitos --- */
    if (dotsWrap && slides.length > 1) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
        dot.className = 'carousel-dot';
        dot.addEventListener('click', () => {
          pauseAutoplay();
          render(i);
        });
        dotsWrap.appendChild(dot);
      });
    }

    /* --- Navegación --- */
    function next() { render(currentIndex + 1); }
    function prev() { render(currentIndex - 1); }

    if (btnNext) btnNext.addEventListener('click', () => { pauseAutoplay(); next(); });
    if (btnPrev) btnPrev.addEventListener('click', () => { pauseAutoplay(); prev(); });

    // Si solo hay 1 slide, ocultar controles
    if (slides.length <= 1) {
      if (btnNext) btnNext.style.display = 'none';
      if (btnPrev) btnPrev.style.display = 'none';
      if (dotsWrap) dotsWrap.style.display = 'none';
      if (counterEl) counterEl.style.display = 'none';
    }

    /* --- Autoplay --- */
    function startAutoplay() {
      if (autoplayMs <= 0 || slides.length <= 1 || paused) return;
      stopAutoplay();
      autoplayTimer = setInterval(next, autoplayMs);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function pauseAutoplay() {
      paused = true;
      stopAutoplay();
    }

    // Pausar autoplay al pasar el mouse
    el.addEventListener('mouseenter', stopAutoplay);
    el.addEventListener('mouseleave', () => {
      if (!paused) startAutoplay();
    });

    // Pausar cuando no está visible
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!paused) startAutoplay();
          } else {
            stopAutoplay();
          }
        });
      }, { threshold: 0.3 });
      observer.observe(el);
    } else {
      startAutoplay();
    }

    /* --- Swipe táctil --- */
    let touchStartX = 0;
    el.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    el.addEventListener('touchend', (e) => {
      const delta = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(delta) > 40) {
        pauseAutoplay();
        if (delta < 0) next(); else prev();
      }
    }, { passive: true });

    /* --- Teclado --- */
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { pauseAutoplay(); next(); }
      if (e.key === 'ArrowLeft')  { pauseAutoplay(); prev(); }
    });

    /* --- Render inicial --- */
    render(0);
  }

  function initAll() {
    document.querySelectorAll('.carousel').forEach(initCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();