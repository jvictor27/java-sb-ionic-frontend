import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	public appPages = [];

	constructor(
		private platform: Platform,
		// private statusBar: StatusBar
		private splashScreen: SplashScreen,
	) {
		this.mountPages();
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	private mountPages() {

			// this.appPages = [
			// 	{
			// 		title: 'Home',
			// 		url: '/home',
			// 		icon: 'home'
			// 	}
			// ];

			this.appPages = [
				{
					title: 'Categoria',
					url: '/categorias',
					icon: 'list'
				},
				{
					title: 'Profile',
					url: '/profile',
					icon: 'people'
				},
				{
					title: 'Carrinho',
					url: '/cart',
					icon: 'cart'
				},
				{
					title: 'Logout',
					url: '/logout',
					icon: 'log-out'
				}
			];
		
	}
}
