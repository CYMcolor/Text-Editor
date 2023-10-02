const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, //30 days
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  // filters the cache request to js and css files bc they are static
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  // stale-while-revalidate tells caches that they may continue to serve a response after it becomes stale for up to the specified number of seconds
  new StaleWhileRevalidate({
    // Name of the cache storage
    cacheName: 'asset-cache',
    plugins: [
      // cache base on status codes
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);