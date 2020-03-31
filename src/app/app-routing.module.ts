import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LogoutComponent } from './shared/logout.component';

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
	},
	{ 
		path: 'produtos', 
		loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosPageModule)
	},
	{ 
		path: 'produto-detail', 
		loadChildren: () => import('./produtos/produto-detail/produto-detail.module').then(m => m.ProdutoDetailPageModule)
	},
	{ 
		path: 'cart', 
		loadChildren: () => import('./cart/cart.module').then(m => m.CartPageModule)
	},
	{ 
		path: 'pick-address', 
		loadChildren: () => import('./pick-address/pick-address.module').then(m => m.PickAddressPageModule)
	},
	{ 
		path: 'payment', 
		loadChildren: () => import('./payment/payment.module').then(m => m.PaymentPageModule)
	},
	{ 
		path: 'order-confirmation', 
		loadChildren: () => import('./order-confirmation/order-confirmation.module').then(m => m.OrderConfirmationPageModule)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
