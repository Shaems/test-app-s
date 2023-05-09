import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { LoginForm } from '../../interfaces/loginForm';
import { FieldConfig } from 'src/app/shared/interfaces/fieldConfig';
import { LoaderService } from 'src/app/services/loader-service/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  fields: FieldConfig[] = [
    {
      formControlName: 'email',
      iconName: 'person-outline',
      type: 'text',
      placeholder: 'Email',
      validators: [Validators.required, Validators.email],
      errors: {
        required: 'El email es requerido.',
        email: 'El email no es válido.',
      },
    },
    {
      formControlName: 'password',
      iconName: 'lock-closed-outline',
      type: 'password',
      placeholder: 'Contraseña',
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(8)],
      errors: {
        required: 'La contraseña es requerida.',
        minlength: 'La contraseña debe tener al menos 5 caracteres.',
        maxlength: 'La contraseña no puede tener más de 8 caracteres.',
      },
    },
    {
      formControlName: 'rememberPassword',
      value: false,
      iconName: 'person-outline',
      type: 'toggle',
      placeholder: 'Email',
      errors: {},
    },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
  }

  login(event: any) {
    this.loaderService.showLoading();
    let loginForm: LoginForm = {
      email: event.email,
      password: event.password,
      rememberPassword: event.rememberPassword
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

}