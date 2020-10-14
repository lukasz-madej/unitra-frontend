import { Injectable } from '@angular/core';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private _snackBarService: SnackBarService, private _authService: AuthService) { }

  handleApiError = (error: HttpErrorResponse, message: string): void => {
    if (error.status >= 400 && error.status !== 401) {
      this._snackBarService.error(message);
    }
  }

  handleAuthError = (error: HttpErrorResponse): void => {
    if (error.status === 401) {
      this._authService.logout();
      this._snackBarService.error('Twoja sesja wygasła. Zaloguj się ponownie.');
    }
  }
}
