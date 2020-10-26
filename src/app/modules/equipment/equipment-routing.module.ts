import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipmentListPageComponent } from './pages/equipment-list-page/equipment-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentRoutingModule {}
