import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialog } from '../../models/confirmation-dialog.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private _dialog: MatDialog) { }

  open = (data: ConfirmationDialog): void => {
    this.dialogRef = this._dialog.open(ConfirmationDialogComponent, { data });
  }

  confirmed$ = (): Observable<boolean> =>
    this.dialogRef.afterClosed()
      .pipe(
        take(1)
      )
}
