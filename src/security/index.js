'use strict';

const helmet = require('helmet');

module.exports = function() {
	const app = this;
	app.use(helmet())
		.use(helmet.noCache())
		.use(helmet.contentSecurityPolicy({
			directives: {
				defaultSrc: ['\'self\''],
				scriptSrc: ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\'',
					'https://code.jquery.com/jquery-3.1.1.min.js',
					'http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/semantic.min.js',
					'http://unpkg.com/feathers-client@^2.0.0/dist/feathers.js',
					'http://unpkg.com/socket.io-client@1.7.3/dist/socket.io.js'
				],
				styleSrc: ['\'self\'', '\'unsafe-inline\'',
					'http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/semantic.min.css',
					'https://fonts.googleapis.com'
				],
				fontSrc: ['\'self\'', 'data:',
					'http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/themes/default/assets/fonts/icons.ttf',
					'http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/themes/default/assets/fonts/icons.woff',
					'http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/themes/default/assets/fonts/icons.woff2',
					'https://fonts.gstatic.com'
				],
				imgSrc: ['\'self\'', 'data:'],
				connectSrc: ['\'self\'',
					'wss://secret-waters-47502.herokuapp.com',
					'ws://localhost:3030'
				],
				objectSrc: ['\'none\'']
			},
			reportOnly: false,
			browserSniff: false,
			disableAndroid: false
		}));
};