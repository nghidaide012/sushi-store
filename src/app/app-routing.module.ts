import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, authGuard } from './auth/auth.guard';
import { OopsComponent } from './ui/oops/oops.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canMatch: [AdminGuard]},
  {path: '**', component: OopsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
