/* ─────────────────────────────────────────
   main.js  –  Art by [Artist Name]
   Responsibilities:
     1. Animate gallery items on scroll (IntersectionObserver)
     2. Set footer copyright year automatically
     3. Nav background opacity on scroll
───────────────────────────────────────── */
 
document.addEventListener('DOMContentLoaded', () => {
 
  /* ── 1. FOOTER YEAR ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
 
 
  /* ── 2. GALLERY SCROLL-REVEAL ──
     Each .gallery-item starts with opacity:0 / translateY(24px) via CSS.
     The IntersectionObserver adds .visible when the item enters the viewport,
     triggering the CSS transition. A small stagger is applied per item index
     within the grid so rows feel like they cascade in.
  ── */
  const items = document.querySelectorAll('.gallery-item');
 
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const index = parseInt(el.dataset.index, 10) || 0;
 
          // stagger: 0.08 s per column position (0, 1, or 2)
          const col = index % 3;
          el.style.transitionDelay = `${col * 0.08}s`;
          el.classList.add('visible');
 
          observer.unobserve(el); // animate once only
        }
      });
    }, {
      threshold: 0.12,      // trigger when 12% of item is visible
      rootMargin: '0px 0px -40px 0px'
    });
 
    items.forEach((item, i) => {
      item.dataset.index = i;
      observer.observe(item);
    });
 
  } else {
    // Fallback: show all items immediately for older browsers
    items.forEach(item => item.classList.add('visible'));
  }
 
 
  /* ── 3. NAV SHADOW ON SCROLL ──
     Adds a subtle bottom shadow to nav once the user scrolls past the fold.
  ── */
  const nav = document.querySelector('nav');
 
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)';
      } else {
        nav.style.boxShadow = 'none';
      }
    };
 
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }
 
});
 