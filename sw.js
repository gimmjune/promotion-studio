// 앱 파일만 캐시합니다. 사용자 자료(IndexedDB, PC 폴더)는 건드리지 않습니다.
const CACHE='poster-studio-pwa-v2';
const FILES=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png?v=2','./icons/icon-512.png?v=2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE&&n.startsWith('poster-studio-pwa-')).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Response.error())));
});