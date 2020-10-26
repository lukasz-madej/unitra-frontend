import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetsListPageComponent } from './pages/sets-list-page/sets-list-page.component';
import { SetsRoutingModule } from './sets-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { getPaginatorTranslation } from '../../shared/translations/paginator.translation';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddSetComponent } from './components/add-set/add-set.component';
import { EditSetComponent } from './components/edit-set/edit-set.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SetsListPageComponent, AddSetComponent, EditSetComponent],
  imports: [
    CommonModule,
    SetsRoutingModule,
    SharedModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPaginatorTranslation() }
  ]
})
export class SetsModule { }
