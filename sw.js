// sw.js

// Install event
self.addEventListener("install", (event) => {
  console.log("✅ Service Worker: Installed");
  self.skipWaiting();
});

// Activate event
self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker: Activated");
});

// Handle push event (kalau nanti pakai Push API / FCM)
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Taskly";
  const options = {
    body: data.body || "Ada tugas baru atau deadline mendekat!",
    icon: "https://azkaarrodhi.github.io/Taskly/taskly.png",
    badge: "https://azkaarrodhi.github.io/Taskly/taskly.png",
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Ketika notifikasi diklik
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then(clientList => {
      // kalau sudah ada tab terbuka → fokuskan
      for (const client of clientList) {
        if (client.url.includes("/") && "focus" in client) {
          return client.focus();
        }
      }
      // kalau belum ada → buka tab baru
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});
