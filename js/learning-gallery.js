/* LEARNING-GALLERY.JS
   1) Each Learning Environment card slides through its photos every 2 seconds.
   2) Clicking a card opens a viewer with its photos (starting at the one showing).
   Photos are listed in js/site-config.js (academics.learning[].images).
   To change the speed, edit SLIDE_MS below (2000 = 2 seconds). */
(function () {
  const lb = document.getElementById("learn-lightbox"); if (!lb) return;
  const SLIDE_MS = 2000;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const L = SCHOOL_CONFIG.academics.learning, cards = [...document.querySelectorAll("#learning .card")];
  const img = lb.querySelector("figure > img"), cap = lb.querySelector(".lb-cap"), thumbs = lb.querySelector(".lb-thumbs");
  const prev = lb.querySelector(".lb-prev"), next = lb.querySelector(".lb-next"), close = lb.querySelector(".lb-close");
  let item = null, cur = 0, opener = null;
  const states = [];

  // ----- Auto-sliding card covers -----
  function setDots(st) { st.dots.forEach((d, k) => d.classList.toggle("on", k === st.idx % st.n)); }
  function slide(st) {
    st.idx++; st.track.style.transform = `translateX(-${st.idx * 100}%)`; setDots(st);
    if (st.idx === st.n) setTimeout(() => {          // reached the copy of photo 1: jump back invisibly
      st.track.style.transition = "none"; st.idx = 0; st.track.style.transform = "translateX(0)";
      void st.track.offsetWidth; st.track.style.transition = "";
    }, 750);
  }
  cards.forEach((c, i) => {
    const it = L[i]; if (!it || !it.images || !it.images.length) return;
    const st = (states[i] = { idx: 0, n: it.images.length });
    const cover = c.querySelector(":scope > img");
    if (cover && st.n > 1) {
      const slider = document.createElement("div"); slider.className = "slider";
      slider.innerHTML = `<div class="slider-track">${it.images.concat(it.images[0]).map((s, k) =>
        `<img src="${s}" alt="${k < st.n ? it.title + ", photo " + (k + 1) : ""}">`).join("")}</div>
        <div class="slider-dots" aria-hidden="true">${it.images.map(() => "<i></i>").join("")}</div>`;
      cover.replaceWith(slider); c.classList.add("has-slider");
      st.track = slider.querySelector(".slider-track"); st.dots = [...slider.querySelectorAll("i")]; setDots(st);
      if (!reduce) setTimeout(() => setInterval(() => { if (!document.hidden && lb.hidden) slide(st); }, SLIDE_MS), i * 450);
    }
    // ----- Make the card clickable -----
    c.tabIndex = 0; c.setAttribute("role", "button"); c.setAttribute("aria-label", "View " + st.n + " photos of " + it.title);
    c.insertAdjacentHTML("beforeend", `<span class="photo-badge">${st.n} photos</span>`);
    c.addEventListener("click", () => open(i, c));
    c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i, c); } });
  });

  // ----- Viewer -----
  function show(n) {
    cur = (n + item.images.length) % item.images.length;
    img.classList.remove("in");
    setTimeout(() => { img.src = item.images[cur]; img.alt = item.title + ", photo " + (cur + 1); img.classList.add("in"); }, 120);
    cap.textContent = item.title + "  \u00b7  " + (cur + 1) + " of " + item.images.length;
    [...thumbs.children].forEach((b, k) => { b.classList.toggle("on", k === cur); b.setAttribute("aria-current", k === cur); });
  }
  function open(i, card) {
    item = L[i]; opener = card;
    thumbs.innerHTML = item.images.map((s, k) => `<button type="button" aria-label="Show photo ${k + 1}"><img src="${s}" alt=""></button>`).join("");
    const many = item.images.length > 1; prev.hidden = next.hidden = !many; thumbs.hidden = !many;
    lb.hidden = false; document.body.style.overflow = "hidden"; show(states[i].idx % states[i].n); close.focus();
  }
  function shut() { lb.hidden = true; document.body.style.overflow = ""; if (opener) opener.focus(); }
  thumbs.addEventListener("click", e => { const b = e.target.closest("button"); if (b) show([...thumbs.children].indexOf(b)); });
  prev.onclick = () => show(cur - 1); next.onclick = () => show(cur + 1); close.onclick = shut;
  lb.addEventListener("click", e => { if (e.target === lb) shut(); });
  addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") shut(); if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });
})();
