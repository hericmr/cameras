const CACHE_NAME = 'camera-cache-v1';

self.addEventListener('fetch', (event) => {
    // Apenas intercepta requisições de imagens das câmeras
    if (event.request.url.includes('/camera/')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Clone a resposta para o cache
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                })
                .catch(() => {
                    // Se falhar, tenta retornar do cache
                    return caches.match(event.request);
                })
        );
    }
});

// Limpa caches antigos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
}); 