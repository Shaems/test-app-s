// import { TestBed } from '@angular/core/testing';

// import { AuthGuard } from './auth.guard';
// import { AuthService } from '../services/auth-service/auth.service';
// import { HttpClientModule } from '@angular/common/http';
// import { of } from 'rxjs';
// import { RouterTestingModule } from '@angular/router/testing';

// describe('AuthGuard', () => {
//   let guard: () => true | Promise<boolean>;
//   let mockAuthService: { isLoggedIn: jasmine.Spy }

//   beforeEach(() => {
//     mockAuthService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
//     mockAuthService.isLoggedIn.and.returnValue(of(true));

//     TestBed.configureTestingModule({
//       providers: [
//         {provide: AuthService, useValue: mockAuthService},
//       ],
//       imports: [RouterTestingModule.withRoutes([]),]
//     });
//     guard = TestBed.inject(AuthGuard);
//   });

//   it('should be created', () => {
//     expect(guard).toBeTruthy();
//   });

//   it('should return true when user is login', () => {
//     mockAuthService.isLoggedIn.and.returnValue(of(true));
//     // mockAuthService.isLoggedIn()
//     expect(AuthGuard()).toBe(true)
//   })
// });
