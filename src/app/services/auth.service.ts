import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IAuthUser, IUser, IUserLogin } from "../types/user.interface";
import { API_URL } from "../constants/constants";
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    public accessToken = ''
    isAuthSig = signal<boolean>(false)

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly toastr: ToastrService
    ) {
        // const token = localStorage.getItem('token')
        this.isAuthSig.set(!!this.accessToken)
    }

    signUp(userData: IAuthUser) {
        return this.http
        .post(`${API_URL}/Users/register`, userData)
        .pipe()
        .subscribe(() => this.toastr.success('Успешно'))
    }

    // Ваш метод login в AuthService на Angular
    login(userData: IUserLogin) {
        return this.http
            .post<IUser>(`${API_URL}/Users/login`, userData)
            .pipe(
                tap((res: IUser) => {
                    if(res && res.access_token) {
                        localStorage.setItem('token', res.access_token);
                        this.isAuthSig.set(true)
                        console.log(res.access_token);
                        this.accessToken = res.access_token;
                    }
                    this.isAuthSig.set(true);
                })
            )
            .subscribe(() => {
                this.toastr.success('Вы вошли')
                this.router.navigate(["/home"])
            });
    }

    logout() {
        localStorage.removeItem('token')
        this.isAuthSig.set(false)
        this.router.navigate(["/login"])
        this.toastr.success('logged out')
    }

}