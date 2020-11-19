import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { UserResolver } from './core/user/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard],
    resolve: { user: UserResolver }
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '**',
    loadChildren: () => import('./core/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
