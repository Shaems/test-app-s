import { TestBed } from "@angular/core/testing";
import { AuthService } from "src/app/shared/services/auth-service/auth.service";
import { AuthGuard } from "./auth.guard";
import { Router } from "@angular/router";

describe('AuthGuard', () => {
    it('should return true', () => {
      TestBed.configureTestingModule({
        providers: [
          { provide: AuthService, useValue: { isLoggedIn: () => true }},
        ],
      });
  
      const guard = TestBed.runInInjectionContext(AuthGuard);
      expect(guard).toBeTruthy();
    });
  });