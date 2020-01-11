import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CidadeDto } from './../_models/cidade-dto';
import { SignupPageModule } from './../signup/signup.module';

@Injectable({
	providedIn: 'root'
})
export class CidadeService {

	constructor(public http: HttpClient) { }

	findAll(estado_id: string): Observable<CidadeDto[]> {
		return this.http.get<CidadeDto[]>(`${environment.baseUrl}estados/${estado_id}/cidades`);
	}
}