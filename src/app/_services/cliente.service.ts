import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { ClienteDto } from '../_models/cliente-dto';
import { SignupPageModule } from './../signup/signup.module';
import { environment } from './../../environments/environment';


@Injectable({
	providedIn: 'root'
})
export class ClienteService {

	constructor(public http: HttpClient, public storage: StorageService) { }

	findByEmail(email: string): Observable<ClienteDto> {
		return this.http.get<ClienteDto>(`${environment.baseUrl}clientes/email?value=${email}`);
	}

	getImageFromBucket(id: string): Observable<any> {
		const url = `${environment.bucketBaseUrl}cp${id}.jpg`;
		return this.http.get(url, { responseType: 'blob' });
	}

	inserir(cliente: ClienteDto) {
		return this.http.post(`${environment.baseUrl}clientes`, cliente,
		{
			observe: 'response',
			responseType: 'text'
		});
	}
}