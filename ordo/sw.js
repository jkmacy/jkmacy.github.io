const CORE="ordo-2026-core-squint-f2aed6e1432e",PAGES='ordo-2026-pages-v1',ASSETS=["index.html","daily.html","style.css","app.js","views.js","content.js","data.js","readable-data.json","references.json","edition.json","manifest.json","icon-192.png","icon-512.png","../shared/routes.js","app.js?v=2026-10-10-breviary2","style.css?v=2026-10-10-breviary2","views.js?v=2026-10-10-breviary2","../shared/routes.js?v=2026-10-10-breviary2","../vendor/squint-cljs/LICENSE.txt","../vendor/squint-cljs/core.js","../vendor/squint-cljs/src/squint/core.js"];
const URLs=ASSETS.map(p=>new URL(p,self.location.href).href);
self.addEventListener('install',e=>e.waitUntil(caches.open(CORE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ordo-2026-')&&![CORE,PAGES].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url),scope=new URL(self.registration.scope);
 if(e.request.method!=='GET'||u.origin!==scope.origin||(!u.pathname.startsWith(scope.pathname)&&!URLs.includes(u.href)))return;
 e.respondWith((async()=>{
  const core=await caches.open(CORE),pages=await caches.open(PAGES);
  const cached=await core.match(e.request)||await pages.match(e.request);if(cached)return cached;
  try{const r=await fetch(e.request);if(r.ok&&u.pathname.startsWith(scope.pathname+'pages/'))await pages.put(e.request,r.clone());return r;}
  catch(err){if(e.request.mode==='navigate')return await core.match(new URL('index.html',scope).href);return new Response('This page is not saved offline.',{status:503});}
 })());
});
