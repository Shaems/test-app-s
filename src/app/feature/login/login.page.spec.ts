import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../shared/services/auth-service/auth.service';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert-service/alert.service';
import { LoaderService } from 'src/app/shared/services/loader-service/loader.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  let authServiceSpy: { login: jasmine.Spy }
  let routerSpy: jasmine.SpyObj<Router>;
  let loaderServiceSpy: jasmine.SpyObj<LoaderService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  let loginResponse = {
    status: 'OK',
    token: '123456789'
  }

  beforeEach(() => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['login'])
    authServiceSpy.login.and.returnValue(of(loginResponse))
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['showLoading', 'dimissLoading']);
    alertServiceSpy = jasmine.createSpyObj('LoaderService', ['alert']);

    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        { provide: AuthService, useValue:  authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LoaderService, useValue: loaderServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        FormBuilder,
        ReactiveFormsModule
      ]
    })
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('call login()', () => {
    const validEmail = 'valid-email@example.com';
    const validPassword = 'Hola1234';
    const dataForm = {
      email: validEmail,
      password: validPassword,
      rememberPassword: false
    }

    it('when send valid values', () => {
      component.login(dataForm);

      expect(loaderServiceSpy.showLoading).toHaveBeenCalled();
      expect(authServiceSpy.login).toHaveBeenCalledWith(dataForm);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('home');
    });

    it('should set error on error', () => {
      authServiceSpy.login.and.returnValue(throwError(() => new Error('Error message')));
      component.login(dataForm);

      expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
      expect(authServiceSpy.login).toHaveBeenCalled();
      expect(loaderServiceSpy.dimissLoading).toHaveBeenCalled();
      expect(alertServiceSpy.alert).toHaveBeenCalledWith('Error', 'Error message');
    });
  })

});
