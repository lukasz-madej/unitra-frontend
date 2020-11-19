import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../core/auth/guards/auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.module').then((m) => m.CategoriesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'equipment',
        loadChildren: () => import('../equipment/equipment.module').then((m) => m.EquipmentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'sets',
        loadChildren: () => import('../sets/sets.module').then((m) => m.SetsModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
