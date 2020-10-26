import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListPageComponent } from './pages/categories-page/categories-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
