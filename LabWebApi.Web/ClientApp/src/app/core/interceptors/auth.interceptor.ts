import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError, switchMap, catchError } from "rxjs";
import { AuthenticationService } from "../services/Authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private router:
        Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
            const token = localStorage.getItem('token')?.toString();
            return next.handle(this.addTokenHeader(req, token));
    }
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refreshToken().pipe(
            switchMap(() => {
                const token = localStorage.getItem('token')?.toString();
                return next.handle(this.addTokenHeader(request, token));
            }),
            catchError((err) => {
                if (err.error.error == 'Invalid refrash token') {
                    this.authService.logout();
                    this.router.navigate(['/login']);
                }

                return throwError(() => err);
            })
        );
    }
    private addTokenHeader(request: HttpRequest<any>, token?: string) {
        console.log('jbsvfbd')
        return request.clone({
            headers: request.headers.set('Authorization',
                'Bearer ' + token)
        });
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};