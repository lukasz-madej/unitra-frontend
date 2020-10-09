import { Injectable } from '@angular/core';
import { Credentials } from '../models/login.model';
import { LoadingService } from '../../../shared/services/loading.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  userLogin = (credentials: Credentials): void => {
    this._loadingService.show();

    this._authService.authenticate(credentials)
      .pipe(
        take(1)
      )
      .subscribe((): void => {
        this._loadingService.hide();

        if (this._authService.isLoggedIn) {
          this._router.navigateByUrl('/');
        } else {
          this._snackBar.open('Nieprawidłowy login i / lub hasło.', 'Zamknij', { duration: 5000, verticalPosition: 'top' });
        }
      });
  }
}
