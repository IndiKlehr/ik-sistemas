/* ============================================================
   IK SISTEMAS — FILTROS DE PORTFOLIO (Casos de Éxito)
   ============================================================ */

(function () {
  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards      = document.querySelectorAll('.portfolio-card');
    if (!filterBtns.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach((b) => {
          b.className = 'filter-btn px-3 py-1.5 rounded-lg text-text-secondary hover:text-text-primary font-label-interactive text-xs transition-colors';
        });
        btn.className = 'filter-btn px-4 py-1.5 rounded-lg bg-surface-elevated text-primary font-label-interactive text-xs font-semibold shadow-sm';

        cards.forEach((card) => {
          const category = card.dataset.category;
          const show = filter === 'all' || category === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioFilters);
  } else {
    initPortfolioFilters();
  }
})();