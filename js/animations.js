/* ANIMATIONS.JS - scroll reveals, staggering, tilt cards, ripple buttons, parallax, progress bar.
   Everything switches itself off for visitors who prefer reduced motion. */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reveals = $$(".reveal, .img-reveal, .section-title, .timeline li");

  // ----- Scroll reveal (with a small stagger between neighbouring cards) -----
  if (!reduce) $$(".grid, .grid-5, .gallery, .photos").forEach(g => [...g.children].forEach((c, i) => (c.style.transitionDelay = (i % 4) * 90 + "ms")));
  if (reduce || !("IntersectionObserver" in window)) reveals.forEach(e => e.classList.add("in"));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in"); io.unobserve(e.target);
      setTimeout(() => (e.target.style.transitionDelay = ""), 1300); // so hover effects are not delayed
    }), { threshold: 0.12 });
    reveals.forEach(e => io.observe(e));
  }

  // ----- Gold scroll-progress bar -----
  const bar = document.createElement("div"); bar.className = "scroll-progress"; bar.setAttribute("aria-hidden", "true"); document.body.appendChild(bar);
  const hero = document.querySelector(".hero-bg");
  let ticking = false;
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    if (hero && !reduce && scrollY < 1200) hero.style.transform = `translateY(${Math.min(scrollY * 0.18, 60)}px)`; // gentle parallax
    ticking = false;
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // ----- Button ripple -----
  $$(".btn").forEach(b => b.addEventListener("click", e => {
    if (reduce) return;
    const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2, s = document.createElement("span");
    s.className = "ripple"; s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    b.appendChild(s); setTimeout(() => s.remove(), 650);
  }));

  // ----- 3D tilt + gold glow on cards (mouse devices only) -----
  if (!reduce && matchMedia("(hover:hover) and (pointer:fine)").matches) {
    $$(".card").forEach(c => {
      c.addEventListener("pointermove", e => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty("--mx", x * 100 + "%"); c.style.setProperty("--my", y * 100 + "%");
        c.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-5px)`;
      });
      c.addEventListener("pointerleave", () => (c.style.transform = ""));
    });
  }
})();
