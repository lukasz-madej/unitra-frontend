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

  open = (message: string, action: string = 'Zamknij', config: MatSnackBarConfig = this._defaultConfig): void => {
    this._snackBar.open(message, action, config);
  }
}
