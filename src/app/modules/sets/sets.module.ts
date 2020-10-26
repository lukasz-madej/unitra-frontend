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

@NgModule({
  declarations: [SetsListPageComponent],
  imports: [
    CommonModule,
    SetsRoutingModule,
    SharedModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPaginatorTranslation() }
  ]
})
export class SetsModule { }
