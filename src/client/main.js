import Vue from 'vue';
import page from 'page';
import routes from './routes';
import io from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';

const socket = io();
window.app = feathers()
	.configure(socketio(socket))
	.configure(hooks())
	.configure(authentication({
		storage: window.localStorage
	}));
window.client = app;
window.vueApp = new Vue({
	el: '#app',
	data: {
		ViewComponent: {
			render: h => h('div', 'loading...')
		}
	},
	render(h) {
		return h(this.ViewComponent)
	}
});

Object.keys(routes).forEach(route => {
	const Component = require('./pages/' + routes[route] + '.vue')
	page(route, () => vueApp.ViewComponent = Component)
});
page('*', () => vueApp.ViewComponent = require('./pages/404.vue'));
app.authenticate().then(() => {
	const user = JSON.parse(window.localStorage.getItem('tmm-user'));
	switch (user.role) {
		case 'tmm':
			page();
			break;
		case 'org':
			if (window.location.pathname && window.location.pathname !== '/') {
				page();
			} else {
				page('/org-home');
			}
			break;
	}
}).catch(() => {
	switch (window.location.pathname) {
		case '/new-organization/':
			page();
			break;
		default:
			page('/login');
	}
});