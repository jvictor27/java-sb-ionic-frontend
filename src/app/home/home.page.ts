import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(public navCtrl: NavController, public menu: MenuController) {}

    login() {
       this.navCtrl.navigateRoot('/categorias');
    }
    
    ngOnInit() {
        // this.menu.enable(false);
    }
    
    ionViewWillEnter() {
        this.menu.enable(false);
    }
    
    ionViewDidLeave() {
        this.menu.enable(true);
    }
}
