if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/serviceWorker.js')
		.then(reg => {
			console.log('Service worker registred successfully', reg)
		})
		.catch(err => {
			console.log('service worker not registred !!', err)
		})
}
