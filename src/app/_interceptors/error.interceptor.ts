import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../_services/storage.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public storage: StorageService,
        public alertController: AlertController
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('Passou!!');

        return next.handle(request)
            .pipe(
                catchError(err => {

                    switch (err.status) {
                        case 401:
                            this.handled401();
                            console.log('case 401:');
                            break;
                        case 403:
                            this.handled403();
                            break;
                        default:
                            this.handledDefaultError(err);
                            break;
                    }

                    // console.log("Erro capturado pelo interceptor")
                    const error = err.error.message || err.statusText;
                    return throwError(error);
                    // return throwError(err.error);
                })
            );
    }

    async handledDefaultError(err: any) {
        const alert = await this.alertController.create({
            header: 'ERRO ' + err.status,
            subHeader: err.error,
            message: err.message,
            buttons: ['OK']
          });
          await alert.present();
    }

    async handled401() {
        const alert = await this.alertController.create({
            header: 'ERRO 401',
            subHeader: 'Falha de autenticação',
            message: 'Email ou senha incorretos',
            buttons: ['OK']
          });
          await alert.present();
    }

    handled403() {
        this.storage.setLocalUser(null);
    }
}