import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private readonly _defaultConfig: MatSnackBarConfig;

  constructor(private _snackBar: MatSnackBar) {
    this._defaultConfig = {
      duration: 5000,
      verticalPosition: 'top'
    };
  }

  info = (message: string, action: string = 'Zamknij', config?: MatSnackBarConfig): void => {
    this._snackBar.open(message, action, { ...this._defaultConfig, ...config });
  }

  error = (message: string, config?: MatSnackBar): void => {
    this._snackBar.open(message, null, { ...this._defaultConfig, panelClass: 'error', ...config });
  }

  hideAll = (): void => {
    this._snackBar.dismiss();
  }
}
