
import { AlertService } from './Alert.service';
import { UserLogin } from '../models/auth/UserLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable, of, catchError } from 'rxjs';
import { StorageService } from './storage/Storage.service';
import {
    accountLoginUrl, accountLogoutUrl, accountRegistrationUrl,
    refreshTokenUrl
} from 'src/app/configs/authController-endpoints';
import { UserRegistration } from '../models/auth/UserRegistration';
import { CurrentUserInfo } from '../models/auth/CurrentUserInfo';
import { UserAutorization } from '../models/auth/UserAuthorization';
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private readonly userId: string =
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
    private readonly userName: string =
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
    private readonly userRole: string =
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    private jwtHelperService = new JwtHelperService();
    private token = '';
    currentUser: CurrentUserInfo;
    constructor(private http: HttpClient,
        private storage: StorageService,
        private alertService: AlertService) {
        this.token = this.storage.getItem("token")!;
        if (this.token) {
            this.getUserInfo(this.token)
        }
        else {
            this.currentUser = new CurrentUserInfo();
        }
    }
    login(request: UserLogin): Observable<any> {
        return this.http.post<UserAutorization>(accountLoginUrl, request).pipe(
            map((tokens: UserAutorization) => this.setTokensInLocalStorage(tokens)),
            catchError(err => {
                this.alertService.errorAlert(err.error, "Login Failed!");

                return of();
            }));
    }
    registration(request: UserRegistration): Observable<any> {
        console.log('hguhdvabsjndsfhvdakjdhfskdbjshadv')
        return this.http.post<UserAutorization>(accountRegistrationUrl,
            request).pipe(
                catchError(err => {
                    this.alertService.errorAlert(err.error, "Registration Failed!");
                    return of();
                }));
    }
    refreshToken(): Observable<UserAutorization> {
        let request = new UserAutorization();
        request.refreshToken = this.storage.getItem("refreshToken")?.toString()!;
        request.token = localStorage.getItem('token')?.toString()!;
        return this.http.post<UserAutorization>(refreshTokenUrl, request).pipe(
            map(tokens => {
                if (tokens.token && tokens.refreshToken) {
                    this.setTokensInLocalStorage(tokens);
                }
                return tokens;
            }),
            catchError(err => {
                this.alertService.errorAlert(err.error, "Login Failed!");
                return of();
            }));
    }
    logout() {
        let tokens: UserAutorization = new UserAutorization();
        tokens.token = localStorage.getItem('token')?.toString()!;
        tokens.refreshToken = localStorage.getItem('refreshToken')?.toString()!;
        return this.http.post<UserAutorization>(accountLogoutUrl, tokens).pipe(map(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        }));
    }
    private setTokensInLocalStorage(tokens: UserAutorization) {
        if (tokens.token && tokens.refreshToken) {
            this.token = tokens.token;
            this.storage.setItem("token", tokens.token);
            this.storage.setItem("refreshToken", tokens.refreshToken);
            console.log(this.token);
            this.getUserInfo(this.token);

        }
    }
    private getUserInfo(token: any) {
        const decodedToken = this.jwtHelperService.decodeToken(token);
        this.currentUser = new CurrentUserInfo();
        this.currentUser.id = decodedToken[this.userId];
        this.currentUser.userName = decodedToken[this.userName];
        this.currentUser.role = decodedToken[this.userRole];
    }
    public async isAuthenticatedWithRefreshToken(): Promise<boolean> {
        const token: any = this.storage.getItem("token");
        const refreshToken: any = this.storage.getItem("refreshToken");
        console.log('there')
        if (!this.jwtHelperService.isTokenExpired(token) && refreshToken)
            return true;
        let result = false;
        if (token && refreshToken) {
            try {
                var res = await this.refreshToken().toPromise();
                if (res?.token && res.refreshToken)
                    result = true;
            } catch {
                result = false;
            }
        }
        return result;
    }
}