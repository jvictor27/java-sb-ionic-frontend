import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../_services/storage.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('Passou!!');

        return next.handle(request)
            .pipe(
                catchError(err => {
                    let errorObj = err;
                    if (errorObj.error) {
                        errorObj = errorObj.error;
                        if (!errorObj.status) {
                            errorObj = JSON.parse(errorObj);
                        }
                    }

                    switch (errorObj.status) {
                        case 403:
                            this.handle403();
                            break;
                        default:
                            break;
                    }

                    // console.log("Erro capturado pelo interceptor")
                    // const error = err.error.message || err.statusText;
                    return throwError(err.error);
                })
            );
    }

    handle403() {
        this.storage.setLocalUser(null);
    }
}