import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { CategoriaService } from './../_services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaDto } from './../_models/categoria.dto';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  
	categorias$: Observable<CategoriaDto[]> ;
	bucketUrl: String = environment.bucketBaseUrl;

    constructor(public service: CategoriaService) { }
  
    ngOnInit() {
    	this.findAll();
	}
	
	findAll() {
		this.categorias$ = this.service.findAll();
	}
  
}
