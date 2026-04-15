const CACHE = 'slibarre-v1';
const ASSETS = [
  './slibarre-dex.html',
  './manifest.json',
  './logo.png',
  './face_booster_classique.png',
  './face_booster_ninja.png',
  './dos_ninja.png',
  './face_groupe.png',
  './dos_groupe.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS.map(a => {
      return new Request(a, { cache: 'reload' });
    })).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() =>
      caches.match('./slibarre-dex.html')
    ))
  );
});

// ===== NOTIFICATIONS PUSH =====
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || 'Slibarre-Dex';
  const body  = data.body  || 'Un événement t\'attend !';
  const icon  = data.icon  || './logo.png';
  const badge = './logo.png';
  e.waitUntil(
    self.registration.showNotification(title, {
      body, icon, badge,
      vibrate: [100, 50, 200],
      data: { url: data.url || './slibarre-dex.html' }
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length > 0) return list[0].focus();
      return clients.openWindow(e.notification.data.url || './slibarre-dex.html');
    })
  );
});

// ===== SCHEDULED NOTIFICATIONS (via periodic sync if supported) =====
self.addEventListener('periodicsync', e => {
  if (e.tag === 'check-energy') {
    e.waitUntil(sendEnergyReminder());
  }
});

async function sendEnergyReminder() {
  const h = new Date().getHours();
  // Eclipse reminder at 22h
  if (h === 22) {
    self.registration.showNotification('🌑 L\'Éclipse commence !', {
      body: 'Les cartes Shadow sont disponibles pendant la nuit !',
      icon: './logo.png',
      badge: './logo.png'
    });
  }
  // Charge reminder at noon
  if (h === 12) {
    self.registration.showNotification('🔋 Énergie pleine !', {
      body: 'Viens ouvrir ton pack Ninja !',
      icon: './logo.png',
      badge: './logo.png'
    });
  }
}
