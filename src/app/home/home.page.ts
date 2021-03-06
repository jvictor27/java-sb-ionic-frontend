import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

import { CredenciaisDto } from '../_models/credenciais-dto';
import { AuthService } from './../_services/auth.service';
import { environment } from './../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    credenciais: CredenciaisDto = {
        email: '',
        senha: ''
    };

    constructor (public navCtrl: NavController,
        public menu: MenuController,
        public authService: AuthService) {}

    login() {
        this.authService.authenticate(this.credenciais)
        .subscribe(response => {
          // console.log(response.headers.get('Authorization'));
          this.authService.successfulLogin(response.headers.get('Authorization'));
          this.navCtrl.navigateRoot('/categorias');
        },
        error => {});
    }
    
    ngOnInit() {
        if (!environment.production) {
            this.credenciais.email = 'alexandre.miranda@gmail.com';
            this.credenciais.senha = '123';
        }
    }
    
    ionViewWillEnter() {
        this.menu.enable(false);
        this.authService.refreshToken()
            .subscribe(response => {
                this.authService.successfulLogin(response.headers.get('Authorization'));
                this.navCtrl.navigateRoot('/categorias');
            },
            error => {});
    }
    
    ionViewDidLeave() {
        this.menu.enable(true);
    }

    signup() {
        this.navCtrl.navigateRoot('/signup');
    }
}
