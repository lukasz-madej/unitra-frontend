import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipmentPageComponent } from './pages/equipment-page/equipment-page.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentRoutingModule {}
