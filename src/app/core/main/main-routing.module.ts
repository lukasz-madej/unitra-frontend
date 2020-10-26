import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'categories',
        loadChildren: () => import('../../modules/categories/categories.module').then((m) => m.CategoriesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'equipment',
        loadChildren: () => import('../../modules/equipment/equipment.module').then((m) => m.EquipmentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'sets',
        loadChildren: () => import('../../modules/sets/sets.module').then((m) => m.SetsModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
