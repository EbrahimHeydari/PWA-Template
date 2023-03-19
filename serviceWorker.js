const staticCacheName = 'site-static'

const cacheAssets = [
	'/',
	'/js/app.js',
	'/index.html',
	'/image/cover.png',
	'/style/style.css',
	'/pages/about.html',
	'/pages/fallback.html',
]

self.addEventListener('install', evt => {
	evt.waitUntil(
		caches
			.open(staticCacheName)
			.then(cache => {
				console.log('caching assets...')
				cache.addAll(cacheAssets)
			})
			.catch(err => {})
	)
})

self.addEventListener('activate', evt => {
	evt.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(
				keys
					.filter(key => key !== staticCacheName)
					.map(key => caches.delete(key))
			)
		})
	)
})

self.addEventListener('fetch', evt => {
	evt.respondWith(
		caches
			.match(evt.request)
			.then(res => res || fetch(evt.request))
			.catch(() => {
				if (evt.request.url.indexOf('.html') > -1)
					return caches.match('/pages/fallback.html')
			})
	)
})
