import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentPageComponent } from './pages/equipment-page/equipment-page.component';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [EquipmentPageComponent],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    SharedModule,
    MatButtonModule
  ]
})
export class EquipmentModule { }
