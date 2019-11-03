import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

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
                    console.log("Erro capturado pelo interceptor")
                    // const error = err.error.message || err.statusText;
                    return throwError(err.error);
                })
            );
    }
}