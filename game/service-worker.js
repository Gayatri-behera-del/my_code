const cacheName='snake-game-v1';
const filesToCache=['./','./snake.html','./snake.css','./snake.js','./manifest.json','./icon-192.png','./icon-512.png','https://www.soundjay.com/button/beep-07.wav','https://www.soundjay.com/button/beep-10.wav','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'];

self.addEventListener('install', e=>{ e.waitUntil(caches.open(cacheName).then(cache=>cache.addAll(filesToCache))); });
self.addEventListener('fetch', e=>{ e.respondWith(caches.match(e.request).then(resp=>resp||fetch(e.request))); });
