const CACHE_NAME = 'camera-cache-v1';
const CACHE_DURATION = 60 * 1000; // 1 minuto

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/camera/')) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((response) => {
                    if (response) {
                        const fetchTime = response.headers.get('fetch-time');
                        if (fetchTime && Date.now() - fetchTime < CACHE_DURATION) {
                            return response;
                        }
                    }

                    return fetch(event.request).then((networkResponse) => {
                        const responseToCache = networkResponse.clone();
                        const headers = new Headers(responseToCache.headers);
                        headers.append('fetch-time', Date.now());
                        
                        cache.put(event.request, new Response(
                            responseToCache.body,
                            {
                                status: responseToCache.status,
                                statusText: responseToCache.statusText,
                                headers: headers
                            }
                        ));

                        return networkResponse;
                    });
                });
            })
        );
    }
}); 