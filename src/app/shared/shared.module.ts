import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PanelComponent } from './components/panel/panel.component';
import { MatCardModule } from '@angular/material/card';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EquipmentSearchComponent } from './components/equipment-search/equipment-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NullOrEmptyPipe } from './pipes/null-or-empty.pipe';
import { MatIconModule } from '@angular/material/icon';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ImageListComponent } from './components/image-list/image-list.component';
import { NgxFilesizeModule } from 'ngx-filesize';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogComponent } from './components/dialog/dialog.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { YearPickerComponent } from './components/year-picker/year-picker.component';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { SetSelectorComponent } from './components/set-selector/set-selector.component';
import { MatSelectModule } from '@angular/material/select';
import { IsAdminDirective } from './directives/is-admin/is-admin.directive';

const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    LoadingComponent,
    PanelComponent,
    ConfirmationDialogComponent,
    EquipmentSearchComponent,
    NullOrEmptyPipe,
    ImageUploadComponent,
    ImageListComponent,
    DialogComponent,
    ImageGalleryComponent,
    YearPickerComponent,
    CategorySelectorComponent,
    SetSelectorComponent,
    IsAdminDirective
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatIconModule,
    MatProgressBarModule,
    NgxFilesizeModule,
    MatTooltipModule,
    CrystalLightboxModule,
    MatSelectModule
  ],
  exports: [
    LoadingComponent,
    PanelComponent,
    EquipmentSearchComponent,
    NullOrEmptyPipe,
    ImageUploadComponent,
    ImageListComponent,
    DialogComponent,
    ImageGalleryComponent,
    YearPickerComponent,
    CategorySelectorComponent,
    SetSelectorComponent,
    IsAdminDirective
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [
    MatSnackBar,
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { disableClose: true, hasBackdrop: true } }
  ]
})
export class SharedModule { }
