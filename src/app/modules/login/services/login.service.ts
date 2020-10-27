import { Injectable } from '@angular/core';
import { Credentials } from '../models/login.model';
import { AuthService } from '../../../core/auth/services/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../../core/user/models/user.model';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';
import { UserService } from '../../../core/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBarService: SnackBarService,
    private _userService: UserService
  ) { }

  login = (credentials: Credentials): void => {
    this._snackBarService.hideAll();
    this._authService.authenticate(credentials)
      .pipe(
        take(1)
      )
      .subscribe((response: User): void => {
        this._userService.user = response;
        this._navigateToDashboard();
      }, (): void => {
        this._snackBarService.error('Nieprawidłowy login i / lub hasło.');
      });
  }

  checkUserSession = (): void => {
    if (this._authService.isLoggedIn) {
      this._navigateToDashboard();
    }
  }

  private _navigateToDashboard = (): void => {
    this._router.navigateByUrl('/');
  }
}
