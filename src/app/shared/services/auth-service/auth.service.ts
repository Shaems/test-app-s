import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginForm } from '../../interfaces/login/loginForm';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../../interfaces/login/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'https://apimocha.com/test-app/';
  isLogged: boolean = false;

  constructor(
    private http: HttpClient,
  ) { }
  
  login(loginForm: LoginForm): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + `login`, loginForm)
  }

  logout(){
    localStorage.removeItem('token');
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
