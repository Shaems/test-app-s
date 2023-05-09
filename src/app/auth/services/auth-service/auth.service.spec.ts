import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.removeItem('token');
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return true from isLoggedIn when there is a token", () => {
    localStorage.setItem("token", "12345");
    expect(service.isLoggedIn).toBe(true);
  });

  it("should return false from isLoggedIn when there is no tokem", () => {
    expect(service.isLoggedIn).toBeFalsy();
  });
});
