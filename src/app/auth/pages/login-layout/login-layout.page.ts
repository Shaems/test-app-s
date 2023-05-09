import { Component, OnInit } from '@angular/core';
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
export class LoginLayoutPage implements OnInit {

  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private loaderService: LoaderService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      rememberPassword: [false]
    });
  }

  ngOnInit() {
  }

  valid() {
    this.formValid? this.login() : (this.loginError = true);
  }

  login() {
    this.loaderService.showLoading();
    let loginForm: LoginForm = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      rememberPassword: this.loginForm.value.rememberPassword
    }
    this.authService.login(loginForm).subscribe({
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

  get formValid() {
    return (this.loginForm.valid);
  }

  get emailCtrl() { return this.loginForm.controls['email'] }
  get passwordCtrl() { return this.loginForm.controls['password'] }

}