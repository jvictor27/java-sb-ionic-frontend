import { LogoutComponent } from './shared/logout.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
	},
	{
		path: 'categorias',
		loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasPageModule)
	},
	{
		path: 'profile',
		loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule) 
	},
	{
		path: 'logout', 
		component: LogoutComponent
	},
	{
		path: 'signup',
		loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule) 
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
