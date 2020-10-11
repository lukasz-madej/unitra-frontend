import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../models/confirmation-dialog.model';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialog, private _mdDialogRef: MatDialogRef<ConfirmationDialog>) { }

  @HostListener('keydown.esc') onEsc = (): void => {
    this._close(false);
  }

  cancel = (): void => {
    this._close(false);
  }

  confirm = (): void => {
    this._close(true);
  }

  private _close = (value: boolean): void => {
    this._mdDialogRef.close(value);
  }
 }
