import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth-service/auth.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  let mockAuthService: { login: jasmine.Spy }

  beforeEach(async () => {

    mockAuthService = jasmine.createSpyObj('AuthService', ['login'])
    mockAuthService.login.and.returnValue(of('OK'))

    await TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        // { provide: AuthService, useValue: { snapshot: { paramMap: { login(): string { return 'OK'; }}}}, },
        { provide: AuthService },
        FormBuilder,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach((() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should not emit submitEvent when form is invalid and submit button is clicked', () => {
  //   // spyOn(component.login, 'next');
  //   mockAuthService.login.and.returnValue(of(throwError(() => new Error('Error'))));
  //   fixture.detectChanges();

  //   expect(component.login).toHaveBeenCalled();
  // });

});
