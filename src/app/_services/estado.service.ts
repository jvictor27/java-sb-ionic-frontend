import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { EstadoDto } from './../_models/estado-dto';

@Injectable({
    providedIn: 'root'
})
export class EstadoService {

    constructor(public http: HttpClient) { }

    findAll(): Observable<EstadoDto[]> {
        return this.http.get<EstadoDto[]>(`${environment.baseUrl}estados`);
    }
}