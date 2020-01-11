import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoriaDto } from '../_models/categoria-dto';
import { CategoriaService } from './../_services/categoria.service';
import { environment } from './../../environments/environment';

@Component({
	selector: 'app-categorias',
	templateUrl: './categorias.page.html',
	styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

	categorias$: Observable<CategoriaDto[]>;
	bucketUrl: String = environment.bucketBaseUrl;

	constructor(public service: CategoriaService) { }

	ngOnInit() {
		this.findAll();
	}

	findAll() {
		this.categorias$ = this.service.findAll();
	}

}
