// Formkurve – Offline-Cache
const CACHE="formkurve-v9";
const CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png",
  "img/ex/barbell-squat-1.png","img/ex/barbell-squat-2.png","img/ex/bench-press-1.png","img/ex/bench-press-2.png","img/ex/bent-over-rear-deltoid-raise-with-head-on-bench-1.png","img/ex/bent-over-rear-deltoid-raise-with-head-on-bench-2.png","img/ex/biceps-curl-with-dumbbell-1.png","img/ex/biceps-curl-with-dumbbell-2.png","img/ex/biceps-curl-with-machine-1.png","img/ex/biceps-curl-with-machine-2.png","img/ex/cable-crossover-1.png","img/ex/cable-crossover-2.png","img/ex/dumbbell-flys-1.png","img/ex/dumbbell-flys-2.png","img/ex/dumbbell-incline-bench-press-1.png","img/ex/dumbbell-incline-bench-press-2.png","img/ex/dumbbell-lunges-1.png","img/ex/dumbbell-lunges-2.png","img/ex/kneeling-triceps-extension-with-cable-1.png","img/ex/kneeling-triceps-extension-with-cable-2.png","img/ex/lateral-dumbbell-raises-1.png","img/ex/lateral-dumbbell-raises-2.png","img/ex/leg-extensions-1.png","img/ex/leg-extensions-2.png","img/ex/leg-press-1.png","img/ex/leg-press-2.png","img/ex/machine-bench-press-1.png","img/ex/machine-bench-press-2.png","img/ex/rear-deltoid-row-dumbbell-1.png","img/ex/rear-deltoid-row-dumbbell-2.png","img/ex/romanian-dead-lift-1.png","img/ex/romanian-dead-lift-2.png","img/ex/seated-ab-crunch-with-cable-1.png","img/ex/seated-ab-crunch-with-cable-2.png","img/ex/seated-cable-rows-1.png","img/ex/seated-cable-rows-2.png","img/ex/seated-leg-curl-1.png","img/ex/seated-leg-curl-2.png","img/ex/squat-to-bench-with-dumbbells-1.png","img/ex/squat-to-bench-with-dumbbells-2.png","img/ex/standing-biceps-curl-with-cable-1.png","img/ex/standing-biceps-curl-with-cable-2.png","img/ex/step-ups-with-dumbbells-1.png","img/ex/step-ups-with-dumbbells-2.png","img/ex/straight-arm-push-down-1.png","img/ex/straight-arm-push-down-2.png","img/ex/triceps-extensions-using-machine-1.png","img/ex/triceps-extensions-using-machine-2.png","img/ex/triceps-pushdown-with-rope-and-cable-1.png","img/ex/triceps-pushdown-with-rope-and-cable-2.png","img/ex/v-bar-pull-down-1.png","img/ex/v-bar-pull-down-2.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const req=e.request;if(req.method!=="GET")return;
  const url=new URL(req.url);
  // App-Seite: erst Netz (für Updates), sonst Cache
  if(req.mode==="navigate"){e.respondWith(fetch(req).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put("index.html",c));return r}).catch(()=>caches.match("index.html")));return}
  // Schriften und eigene Dateien: Cache zuerst
  if(url.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)||/(^|\.)wikimedia\.org$/.test(url.hostname)){
    e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{if(r.ok||r.type==="opaque"){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c))}return r})));
  }
});
