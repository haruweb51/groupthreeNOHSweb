/* VIDEO-PLAYER.JS - custom HTML5 player. Default video: SCHOOL_CONFIG.video.src
   Visitors can also pick a file from their device (plays only on their own screen). */
(function () {
  const p = document.getElementById("player"); if (!p) return;
  const v = p.querySelector("video"), $ = s => p.querySelector(s), V = SCHOOL_CONFIG.video;
  const play = $("#pp"), seek = $("#seek"), time = $("#time"), vol = $("#vol"), mute = $("#mute"), fs = $("#fs"), msg = $("#vmsg");
  const title = document.getElementById("vtitle"), desc = document.getElementById("vdesc"), file = document.getElementById("vfile");
  let url = null;
  const fmt = s => isFinite(s) ? Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0") : "0:00";
  function load(src, t, d) { msg.hidden = true; v.src = src; v.load(); title.textContent = t; desc.textContent = d; play.textContent = "Play"; }
  load(V.src, V.title, V.description);
  v.addEventListener("error", () => { msg.hidden = false; msg.textContent = "This video could not be played. Add a video at " + V.src + ", or upload one from your device. Playback depends on your browser's codec support (MP4/H.264 works almost everywhere)."; });
  play.onclick = () => (v.paused ? v.play() : v.pause());
  v.onclick = play.onclick;
  v.addEventListener("play", () => (play.textContent = "Pause")); v.addEventListener("pause", () => (play.textContent = "Play"));
  v.addEventListener("timeupdate", () => { seek.value = v.duration ? (v.currentTime / v.duration) * 100 : 0; time.textContent = fmt(v.currentTime) + " / " + fmt(v.duration); });
  v.addEventListener("loadedmetadata", () => (time.textContent = "0:00 / " + fmt(v.duration)));
  seek.oninput = () => { if (v.duration) v.currentTime = (seek.value / 100) * v.duration; };
  vol.oninput = () => { v.volume = vol.value; v.muted = v.volume === 0; mute.textContent = v.muted ? "Unmute" : "Mute"; };
  mute.onclick = () => { v.muted = !v.muted; mute.textContent = v.muted ? "Unmute" : "Mute"; };
  fs.onclick = () => (document.fullscreenElement ? document.exitFullscreen() : (p.requestFullscreen || p.webkitRequestFullscreen).call(p));
  file.onchange = () => {
    const f = file.files[0]; if (!f) return;
    if (url) URL.revokeObjectURL(url);
    url = URL.createObjectURL(f); load(url, f.name, "Playing a video from your device."); v.play().catch(() => {});
  };
})();
