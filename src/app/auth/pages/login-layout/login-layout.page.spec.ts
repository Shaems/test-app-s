import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginLayoutPage } from './login-layout.page';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth-service/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';

describe('LoginLayoutPage', () => {
  let component: LoginLayoutPage;
  let fixture: ComponentFixture<LoginLayoutPage>;

  let mockAuthService: { login: jasmine.Spy }

  beforeEach(async () => {

    mockAuthService = jasmine.createSpyObj('AuthService', ['login'])
    mockAuthService.login.and.returnValue(of('OK'))

    await TestBed.configureTestingModule({
      declarations: [ LoginLayoutPage ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        // { provide: AuthService, useValue: { snapshot: { paramMap: { login(): string { return 'OK'; }}}}, },
        { provide: AuthService },
        FormBuilder,
      ]
    })
    .compileComponents();
  });

  beforeEach((() => {
    fixture = TestBed.createComponent(LoginLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call login() method on form submit', () => {
    spyOn(component, 'valid');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.valid).toHaveBeenCalled();
  });

  it('should show an error message for an invalid email', () => {
    component.loginForm.controls['email'].setValue('invalid-email');
    component.loginForm.controls['password'].setValue('valid-password');
    component.loginError = true;
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage.textContent).toContain('El email no es válido.');
  });

  it('should show an error message for an invalid password', () => {
    component.loginForm.controls['email'].setValue('valid-email@example.com');
    component.loginForm.controls['password'].setValue('1234');
    component.loginError = true;
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(component.loginForm.controls['password'].invalid).toBe(true);
    expect(errorMessage.textContent).toContain('La contraseña debe tener al menos 5 caracteres.');
  });

});
