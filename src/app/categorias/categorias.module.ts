import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CategoriasPage } from './categorias.page';
import { SharedModule } from './../shared/shared.module';

const routes: Routes = [
	{
		path: '',
		component: CategoriasPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [CategoriasPage]
})
export class CategoriasPageModule { }
