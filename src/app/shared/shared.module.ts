import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LogoutComponent } from './logout.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
	declarations: [HeaderComponent, LogoutComponent],
	imports: [
		CommonModule,
		IonicModule
	],
	exports: [HeaderComponent, LogoutComponent]
})
export class SharedModule { }