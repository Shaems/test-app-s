import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { LoginForm } from '../../interfaces/loginForm';
import { AuthService } from '../../services/auth-service/auth.service';
import { LoaderService } from 'src/app/services/loader-service/loader.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.page.html',
  styleUrls: ['./login-layout.page.scss'],
})
export class LoginLayoutPage {

  private fb = inject(FormBuilder)
  private router = inject(Router)
  private authService = inject(AuthService)
  private alertService = inject(AlertService)
  private loaderService = inject(LoaderService)

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
    rememberPassword: [false]
  });

  loginError = false;

  getErrorMessage(): string {
    if(this.emailCtrl.errors) {
      return this.emailCtrl.errors['required']? 'El email es requerido.' : 'El email no es válido.';
    } else {
      if(this.passwordCtrl.errors) {
        return this.passwordCtrl.errors['required'] ? 'La contraseña es requerida.' : 'La contraseña debe tener al menos 5 caracteres.';
      }
    }
    return '';
  }

  valid() {
    if( this.loginForm.valid) {
      this.login()
    } else {
      this.loginError = true;
    }
  }

  login() {
    this.loaderService.showLoading();
    let dataForm: LoginForm = {
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string,
      rememberPassword: this.loginForm.value.rememberPassword as boolean
    }
    this.authService.login(dataForm).subscribe({
      next: res => {
        this.loaderService.dimissLoading();
        console.log(res)
        localStorage.setItem('token', '123456');
        this.router.navigateByUrl('home')
      },
      error: err => {
        this.loaderService.dimissLoading();
        let er = err.message ?? err.error.text ?? 'No se pudo obtener el error';
        this.alertService.alert('Error', er);
      }
    })
  }

  get emailCtrl() { return this.loginForm.controls['email'] }
  get passwordCtrl() { return this.loginForm.controls['password'] }

}