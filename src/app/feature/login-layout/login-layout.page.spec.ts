import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginLayoutPage } from './login-layout.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth-service/auth.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader-service/loader.service';
import { AlertService } from 'src/app/shared/services/alert-service/alert.service';
import { HomePage } from '../home/home.page';

describe('LoginLayoutPage', () => {
  let component: LoginLayoutPage;
  let fixture: ComponentFixture<LoginLayoutPage>;

  let router: Router;

  let emailControl: FormControl;
  let passwordControl: FormControl;

  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let loaderServiceSpy: jasmine.SpyObj<LoaderService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  let validEmail = 'valid-email@example.com';
  let validPassword = 'Hola1234';

  let loginResponse = {
    status: 'OK',
    token: '123456789'
  }

  beforeEach(() => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['login'])
    authServiceSpy.login.and.returnValue(of(loginResponse))

    loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['showLoading', 'dimissLoading']);
    alertServiceSpy = jasmine.createSpyObj('LoaderService', ['alert']);

    TestBed.configureTestingModule({
      declarations: [ LoginLayoutPage ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientModule
      ],
      providers: [
        { provide: AuthService, useValue:  authServiceSpy },
        { provide: LoaderService, useValue: loaderServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        FormBuilder,
      ]
    })
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    emailControl = component.loginForm.controls['email'];
    passwordControl = component.loginForm.controls['password'];
  });

  describe('validate click on submit', () => {

    it('should show be invalid when password incorrect', () => {
      emailControl.setValue(validEmail);
      passwordControl.setValue('1234');
      fixture.detectChanges();

      component.valid();

      expect(component.loginError).toBeTruthy();
    });

    it('should show be invalid when email incorrect', () => {
      emailControl.setValue('email-invalid');
      passwordControl.setValue(validPassword);
      fixture.detectChanges();

      component.valid();

      expect(component.loginForm.valid).toBeFalsy();
      expect(component.loginError).toBeTruthy();
    });

    it('should return correct error message for a email with invalid', () => {
      emailControl.setValue('email-invalid');
      fixture.detectChanges();

      const errorMessage = component.getErrorMessage();

      expect(component.loginForm.invalid).toBeTruthy();
      expect(errorMessage).toEqual('El email no es válido.');
    });

    it('should return correct error message for a password with invalid', () => {
      emailControl.setValue(validEmail);
      passwordControl.setValue('123');
      fixture.detectChanges();

      const errorMessage = component.getErrorMessage();

      expect(component.loginForm.invalid).toBeTruthy();
      expect(errorMessage).toEqual('La contraseña debe tener al menos 5 caracteres.');
    });

    it('should return correct error message for a form with invalid', () => {
      emailControl.setValue('email-invalid');
      passwordControl.setValue('123');
      fixture.detectChanges();

      const errorMessage = component.getErrorMessage();

      expect(component.loginForm.invalid).toBeTruthy();
      expect(errorMessage).toEqual('El email no es válido.', 'La contraseña debe tener al menos 5 caracteres.');
    });

    it('should return correct error message for a form with required', () => {
      emailControl.setValue('');
      passwordControl.setValue('');
      fixture.detectChanges();

      const errorMessage = component.getErrorMessage();

      expect(component.loginForm.invalid).toBeTruthy();
      expect(errorMessage).toEqual('El email es requerido.', 'La contraseña es requerida.');
    });

    it('should not return error message with form is valid', () => {
      emailControl.setValue(validEmail);
      passwordControl.setValue(validPassword);
      fixture.detectChanges();

      const errorMessage = component.getErrorMessage();

      expect(component.loginForm.valid).toBeTruthy();
      expect(errorMessage).toEqual('');
    });

  });

  describe('call login()', () => {
    const dataForm = {
      email: validEmail,
      password: validPassword,
      rememberPassword: false
    }

    it('when send valid values', () => {
      const navigateSpy = spyOn(router, 'navigateByUrl');
      component.loginForm.setValue(dataForm);

      component.valid();

      expect(loaderServiceSpy.showLoading).toHaveBeenCalled();
      expect(authServiceSpy.login).toHaveBeenCalledWith(dataForm);
      expect(navigateSpy).toHaveBeenCalledWith('home');
    });

    it('should set error on error', () => {
      const navigateSpy = spyOn(router, 'navigateByUrl');
      authServiceSpy.login.and.returnValue(throwError(() => new Error('Error message')));

      component.loginForm.setValue(dataForm);
      component.valid();

      expect(component.loginForm.valid).toBeTruthy();
      expect(navigateSpy).not.toHaveBeenCalled();
      expect(authServiceSpy.login).toHaveBeenCalled();
      expect(loaderServiceSpy.dimissLoading).toHaveBeenCalled();
      expect(alertServiceSpy.alert).toHaveBeenCalledWith('Error', 'Error message');
    });
  })

});
