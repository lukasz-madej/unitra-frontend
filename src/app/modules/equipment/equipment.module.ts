import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentListPageComponent } from './pages/equipment-list-page/equipment-list-page.component';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { getPaginatorTranslation } from '../../shared/translations/paginator.translation';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component';

@NgModule({
  declarations: [EquipmentListPageComponent, AddEquipmentComponent],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    SharedModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPaginatorTranslation() }
  ]
})
export class EquipmentModule { }
