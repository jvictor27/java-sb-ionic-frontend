import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';

import { ProfilePage } from './profile.page';
import { SharedModule } from './../shared/shared.module';

const routes: Routes = [
	{
		path: '',
		component: ProfilePage
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
	providers: [Camera],
	declarations: [ProfilePage]
})
export class ProfilePageModule { }