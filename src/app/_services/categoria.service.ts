import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CategoriaDto } from '../_models/categoria-dto';
import { environment } from './../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    constructor(public http: HttpClient) { }

    findAll(): Observable<CategoriaDto[]> {
        return this.http.get<CategoriaDto[]>(`${environment.baseUrl}categorias`);
    }
}