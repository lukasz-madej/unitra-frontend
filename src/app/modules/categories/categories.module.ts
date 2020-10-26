import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListPageComponent } from './pages/categories-page/categories-list-page.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getPaginatorTranslation } from '../../shared/translations/paginator.translation';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';

@NgModule({
  declarations: [CategoriesListPageComponent, AddCategoryComponent, EditCategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    CategoriesRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPaginatorTranslation() }
  ]
})
export class CategoriesModule { }
