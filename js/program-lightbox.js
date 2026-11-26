/* PROGRAM-LIGHTBOX.JS - clicking an Academic Programs image opens it in a viewer.
   Use the arrows (or Left/Right keys) to move between programs; Esc closes.
   Programs come from js/data-programs.js. */
(function () {
  const lb = document.getElementById("program-lightbox"), grid = document.getElementById("programs");
  if (!lb || !grid) return;
  const img = lb.querySelector("figure > img"), cap = lb.querySelector(".lb-cap");
  const prev = lb.querySelector(".lb-prev"), next = lb.querySelector(".lb-next"), close = lb.querySelector(".lb-close");
  const P = ACADEMIC_PROGRAMS;
  let cur = 0, opener = null;

  // Make each program image a button
  [...grid.querySelectorAll(".card")].forEach((c, i) => {
    const pic = c.querySelector(":scope > img"); if (!pic || !P[i]) return;
    pic.classList.add("zoomable");
    pic.tabIndex = 0; pic.setAttribute("role", "button");
    pic.setAttribute("aria-label", "Enlarge image: " + P[i].name);
    pic.addEventListener("click", () => open(i, pic));
    pic.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i, pic); } });
  });

  function show(n) {
    cur = (n + P.length) % P.length; const p = P[cur];
    img.classList.remove("in");
    setTimeout(() => { img.src = p.image; img.alt = p.name; img.classList.add("in"); }, 120);
    cap.textContent = p.name + (P.length > 1 ? "  \u00b7  " + (cur + 1) + " of " + P.length : "");
  }
  function open(i, el) {
    opener = el; prev.hidden = next.hidden = P.length < 2;
    lb.hidden = false; document.body.style.overflow = "hidden"; show(i); close.focus();
  }
  function shut() { lb.hidden = true; document.body.style.overflow = ""; if (opener) opener.focus(); }
  prev.onclick = () => show(cur - 1); next.onclick = () => show(cur + 1); close.onclick = shut;
  lb.addEventListener("click", e => { if (e.target === lb) shut(); });
  addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") shut();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
})();
