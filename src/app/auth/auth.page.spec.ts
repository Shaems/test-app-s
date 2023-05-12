import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthPage } from './auth.page';
import { Router } from '@angular/router';

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [ AuthPage ],
      providers: [
        { provide: Router, useValue: routerSpy },
      ],
    });
    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login with "login" url', () => {
    component.goLogin('login')
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`auth/login`);
  });

  it('should navigate to login with "login-layout" url', () => {
    component.goLogin('login-layout')
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`auth/login-layout`);
  });
});
