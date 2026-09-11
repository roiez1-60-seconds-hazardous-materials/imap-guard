/* iMap Guard — עבודה בלי קליטה: מעטפת האפליקציה נשמרת במכשיר; אריחי המפה החינמית נשמרים תוך כדי שימוש */
const SHELL='ig-shell-v1', TILES='ig-tiles-v1', MAX_TILES=600;
const FILES=['/','/index.html','/about.html','/maplibre-gl.js','/maplibre-gl.css','/rtl-text.js','/manifest.webmanifest','/icon-192.png','/icon-512.png','/icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>![SHELL,TILES].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
async function trim(){const c=await caches.open(TILES);const ks=await c.keys();if(ks.length>MAX_TILES)await Promise.all(ks.slice(0,ks.length-MAX_TILES).map(k=>c.delete(k)))}
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET')return;
  if(u.origin===location.origin){
    // המעטפת: רשת קודם, ובלי רשת — מהמטמון
    e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(SHELL).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('/index.html'))));
    return;
  }
  if(u.hostname==='tiles.openfreemap.org'){
    // אריחים וגופנים של המפה החינמית: מהמטמון אם יש, ורענון ברקע
    e.respondWith(caches.open(TILES).then(async c=>{const hit=await c.match(e.request);const net=fetch(e.request).then(r=>{if(r.ok){c.put(e.request,r.clone());trim()}return r}).catch(()=>null);return hit||(await net)||new Response('',{status:504})}));
  }
});
