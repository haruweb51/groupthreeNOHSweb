/* GROUP-PHOTO.JS - slides through GROUP_PHOTO.images (data-members.js) every 3 seconds.
   Clicking the photo opens a viewer. Visitors can also preview their own photos.
   To change the speed, edit SLIDE_MS (3000 = 3 seconds). */
(function () {
  const f = document.getElementById("group-frame"); if (!f) return;
  const SLIDE_MS = 3000, G = GROUP_PHOTO, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cap = document.getElementById("group-cap"), file = document.getElementById("group-file");
  const lb = document.getElementById("group-lightbox"), lbImg = lb.querySelector("figure > img"), lbCap = lb.querySelector(".lb-cap");
  const thumbs = lb.querySelector(".lb-thumbs"), prev = lb.querySelector(".lb-prev"), next = lb.querySelector(".lb-next"), closeBtn = lb.querySelector(".lb-close");
  let list = [], text = "", idx = 0, cur = 0, track = null, dots = [], timer = null, urls = [];
  const esc = s => String(s).replace(/"/g, "&quot;");

  // ----- Slider -----
  function setDots() { dots.forEach((d, k) => d.classList.toggle("on", k === idx % list.length)); }
  function slide() {
    idx++; track.style.transform = `translateX(-${idx * 100}%)`; setDots();
    if (idx === list.length) setTimeout(() => {   // reached the copy of photo 1: jump back invisibly
      track.style.transition = "none"; idx = 0; track.style.transform = "translateX(0)"; void track.offsetWidth; track.style.transition = "";
    }, 850);
  }
  function build(images, caption) {
    clearInterval(timer); list = images; text = caption; idx = 0; f.classList.remove("group-missing");
    const all = images.length > 1 ? images.concat(images[0]) : images;
    f.innerHTML = `<div class="group-track">${all.map((s, k) => `<div class="group-slide"><div class="group-blur" style="background-image:url('${String(s).replace(/'/g, "%27")}')"></div><img class="group-img" src="${esc(s)}" alt="${k < images.length ? esc(G.alt) + ", photo " + (k + 1) : ""}"></div>`).join("")}</div>` +
      (images.length > 1 ? `<div class="slider-dots" aria-hidden="true">${images.map(() => "<i></i>").join("")}</div>` : "");
    track = f.querySelector(".group-track"); dots = [...f.querySelectorAll(".slider-dots i")]; cap.textContent = caption; setDots();
    let broken = 0;
    track.querySelectorAll(".group-img").forEach(im => im.addEventListener("error", () => {
      im.closest(".group-slide").classList.add("miss");
      if (++broken >= all.length) { f.classList.add("group-missing"); cap.textContent = "Group photos not found. Add the images listed in js/data-members.js"; }
    }));
    if (!reduce && images.length > 1) timer = setInterval(() => { if (!document.hidden && lb.hidden) slide(); }, SLIDE_MS);
  }
  build(G.images, G.caption);

  // ----- Preview your own photos (this visitor only) -----
  file.addEventListener("change", () => {
    const files = [...file.files].filter(x => x.type.startsWith("image/")); if (!files.length) { cap.textContent = "Please choose image files."; return; }
    urls.forEach(u => URL.revokeObjectURL(u)); urls = files.map(x => URL.createObjectURL(x));
    build(urls, "Preview of " + files.length + (files.length > 1 ? " photos" : " photo") + " from your device");
  });

  // ----- Viewer (click or press Enter on the photo) -----
  f.tabIndex = 0; f.setAttribute("role", "button"); f.setAttribute("aria-label", "Enlarge group photos");
  function showLb(n) {
    cur = (n + list.length) % list.length; lbImg.classList.remove("in");
    setTimeout(() => { lbImg.src = list[cur]; lbImg.alt = G.alt + ", photo " + (cur + 1); lbImg.classList.add("in"); }, 120);
    lbCap.textContent = text + (list.length > 1 ? "  \u00b7  " + (cur + 1) + " of " + list.length : "");
    [...thumbs.children].forEach((b, k) => { b.classList.toggle("on", k === cur); b.setAttribute("aria-current", k === cur); });
  }
  function openLb() {
    if (f.classList.contains("group-missing")) return;
    thumbs.innerHTML = list.map((s, k) => `<button type="button" aria-label="Show photo ${k + 1}"><img src="${esc(s)}" alt=""></button>`).join("");
    prev.hidden = next.hidden = thumbs.hidden = list.length < 2;
    lb.hidden = false; document.body.style.overflow = "hidden"; showLb(idx % list.length); closeBtn.focus();
  }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; f.focus(); }
  f.addEventListener("click", openLb);
  f.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(); } });
  thumbs.addEventListener("click", e => { const b = e.target.closest("button"); if (b) showLb([...thumbs.children].indexOf(b)); });
  prev.onclick = () => showLb(cur - 1); next.onclick = () => showLb(cur + 1); closeBtn.onclick = closeLb;
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
  addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") closeLb(); if (e.key === "ArrowLeft") showLb(cur - 1); if (e.key === "ArrowRight") showLb(cur + 1); });
})();
