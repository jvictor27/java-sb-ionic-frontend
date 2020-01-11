import { Injectable } from '@angular/core';

import { LocalUser } from '../_models/local-user';
import { environment } from './../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	constructor() { }

	getLocalUser(): LocalUser {
		const user = localStorage.getItem(environment.STORAGE_KEYS.localUser);

		if (user == null) {
			return null;
		} else {
			return JSON.parse(user);
		}
	}

	setLocalUser(localUser: LocalUser) {
		if (localUser == null) {
			localStorage.removeItem(environment.STORAGE_KEYS.localUser);
		} else {
			localStorage.setItem(environment.STORAGE_KEYS.localUser, JSON.stringify(localUser));
		}
	}
}