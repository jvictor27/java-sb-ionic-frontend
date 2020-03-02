import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { StorageService } from './storage.service';
import { LocalUser } from '../_models/local-user';
import { CredenciaisDto } from '../_models/credenciais-dto';
import { CartService } from './cart.service';
import { environment } from './../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	jwtHelper: JwtHelperService = new JwtHelperService();

	constructor(
		private http: HttpClient,
		private storage: StorageService,
		private cartService: CartService
	) { }

	authenticate(credenciais: CredenciaisDto) {
		return this.http.post(
			`${environment.baseUrl}login`,
			credenciais,
			{
				observe: 'response',
				responseType: 'text'
			});
	}

	refreshToken() {
		return this.http.post(
			`${environment.baseUrl}auth/refresh_token`,
			{},
			{
				observe: 'response',
				responseType: 'text'
			});
	}

	successfulLogin(autorizationValue: string) {
		const tok = autorizationValue.substring(7);
		const user: LocalUser = {
			token: tok,
			email: this.jwtHelper.decodeToken(tok).sub
		};

		this.storage.setLocalUser(user);
		this.cartService.createOrClearCartInLocalStorage();
	}

	logout() {
		this.storage.setLocalUser(null);
	}
}