import { Injectable } from '@angular/core';
import { Credentials } from '../models/login.model';
import { LoadingService } from '../../../shared/services/loading/loading.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { finalize, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _loadingService: LoadingService,
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  login = (credentials: Credentials): void => {
    this._loadingService.show();

    this._authService.authenticate(credentials)
      .pipe(
        take(1),
        finalize((): void => {
          this._loadingService.hide();
        })
      )
      .subscribe((response: User): void => {
        console.log(response);
        this._navigateToDashboard();
      }, (): void => {
        this._snackBar.open('Nieprawidłowy login i / lub hasło.', 'Zamknij', { duration: 5000, verticalPosition: 'top' });
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
