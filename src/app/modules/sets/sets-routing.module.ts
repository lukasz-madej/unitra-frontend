import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetsListPageComponent } from './pages/sets-list-page/sets-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: SetsListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetsRoutingModule {}
