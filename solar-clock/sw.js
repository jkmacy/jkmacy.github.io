// Cache names and file lists are supplied by the offline Lisp build.
// Note: Neocities' CSP (worker-src blob:) currently blocks this worker from registering.
const CACHE="solar-office-squint-55d1c0f48851",FILES=["./","index.html","style.css","icon.svg","icon-192.png","icon-512.png","manifest.json","app.js","core.js","../shared/routes.js","app.js?v=2026-10-10-breviary2","style.css?v=2026-10-10-breviary2","../shared/routes.js?v=2026-10-10-breviary2","../vendor/squint-cljs/LICENSE.txt","../vendor/squint-cljs/core.js","../vendor/squint-cljs/src/squint/core.js"];
const URLs=FILES.map(p=>new URL(p,self.location.href).href);
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('solar-office-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const url=new URL(e.request.url),base=new URL('./',self.location.href);
 if(e.request.method!=='GET'||url.origin!==base.origin)return;
 const appPage=[base.pathname,base.pathname+'index.html'].includes(url.pathname);
 if(!appPage&&!URLs.includes(url.href))return;
 e.respondWith((async()=>{const c=await caches.open(CACHE);return await c.match(appPage?new URL('./index.html',base).href:e.request)||fetch(e.request);})());
});
