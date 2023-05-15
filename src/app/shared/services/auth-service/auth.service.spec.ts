import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.removeItem('token');
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("show loginResponse when call login", () => {
    const dataForm = {
      email: 'valid-email@example.com',
      password: '123456',
      rememberPassword: false
    }
    const mockResponse = {
      status: 'OK',
      token: '123456',
    };
    service.login(dataForm);
    service.login(dataForm).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  })

  it("should return true from isLoggedIn when there is a token", () => {
    localStorage.setItem("token", "12345");
    expect(service.isLoggedIn).toBe(true);
  });

  it("should return false from isLoggedIn when call logout", () => {
    service.logout();
    expect(service.isLoggedIn).toBeFalsy();
  });
});
