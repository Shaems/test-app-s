import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service/auth.service';

export const AuthGuard = () => {
  const router = inject(Router)
  const authService = inject(AuthService)
  return authService.isLoggedIn? true : router.navigate(['/auth'])
};