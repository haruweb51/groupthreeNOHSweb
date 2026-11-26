/* MAPS.JS - loads the Google Map from SCHOOL_CONFIG.googleMaps (internet needed). */
(function () {
  const f = document.getElementById("map-frame"), d = document.getElementById("directions");
  if (f) f.src = SCHOOL_CONFIG.googleMaps;
  if (d) { d.href = SCHOOL_CONFIG.directionsUrl; d.target = "_blank"; d.rel = "noopener"; }
})();
