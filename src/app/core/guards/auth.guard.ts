import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service/auth.service';

export const AuthGuard = () => {
  const router = inject(Router)
  return inject(AuthService)
    .isLoggedIn? true : router.navigate(['/', 'auth'])
};