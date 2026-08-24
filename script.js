// =========================================================
// ANDINO FLOW — script.js
// Menú móvil, animaciones al hacer scroll y botón flotante
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Menú móvil ---------- */
  const header = document.querySelector('.site-header');
  const navToggle = document.getElementById('navToggle');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Cierra el menú al elegir una opción
    document.querySelectorAll('.main-nav a').forEach((link) => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Animación al hacer scroll (reveal) ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: si no hay soporte, mostrar todo directamente
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------- Botón flotante de WhatsApp ---------- */
  const floatWsp = document.getElementById('floatWsp');
  const hero = document.querySelector('.hero');

  if (floatWsp && hero) {
    const heroHeight = hero.offsetHeight;
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > heroHeight * 0.6) {
          floatWsp.classList.add('visible');
        } else {
          floatWsp.classList.remove('visible');
        }
      },
      { passive: true },
    );
  }

  /* ---------- Countdown promo (hasta 6 de noviembre) ---------- */
  const promoCountdown = document.getElementById('promoCountdown');
  const promoEnd = new Date('2026-11-06T23:59:59-03:00');

  function pluralize(value, singular, plural) {
    return value === 1 ? singular : plural;
  }

  function updatePromoCountdown() {
    if (!promoCountdown) return;

    const diff = promoEnd.getTime() - Date.now();

    if (diff <= 0) {
      promoCountdown.textContent = 'La promo finalizó el 6 de noviembre.';
      return;
    }

    const totalMinutes = Math.floor(diff / 60000);

    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    const parts = [
      `${days} ${pluralize(days, 'día', 'días')}`,
      `${hours} ${pluralize(hours, 'hora', 'horas')}`,
      `${minutes} ${pluralize(minutes, 'minuto', 'minutos')}`,
    ];

    promoCountdown.textContent = `Quedan ${parts.join(' : ')}`;
  }
  if (promoCountdown) {
    updatePromoCountdown();
    setInterval(updatePromoCountdown, 60000);
  }
});
