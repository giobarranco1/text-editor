const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { StaleWhileRevalidate } = require('workbox-strategies');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// TODO: Implement asset caching
registerRoute(
  //callback function defined that filters requests we want to cache(JS and CSS files)
  ({request}) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    //name of cache storage
    cacheName: "asset-cache",
    plugins: [
      //this plugin will cache responses with these headers to a max-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
  );
