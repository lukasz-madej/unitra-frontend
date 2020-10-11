import { ThemePalette } from '@angular/material/core';

export interface ConfirmationDialog {
  title: string;
  message: string;
  cancelText: string;
  confirmText: string;
  confirmButtonColor?: ThemePalette;
}
