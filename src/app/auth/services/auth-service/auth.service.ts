import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginForm } from '../../interfaces/loginForm';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'https://apimocha.com/test-app/';
  isLogged: boolean = false;

  constructor(
    private http: HttpClient,
  ) { }
  
  login(loginForm: LoginForm): Observable<any> {
    return this.http.post<any>(this.url + `login`, loginForm)
  }

  logout(){
    localStorage.removeItem('user');
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
