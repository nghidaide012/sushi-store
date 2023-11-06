import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { authGuard, permissionGuard } from './permission.guard';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'order', component: OrderComponent, canActivate: [authGuard]},
  {path: 'order/:id', component: OrderDetailComponent, canActivate: [permissionGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
