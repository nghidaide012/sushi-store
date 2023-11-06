import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: '', redirectTo: 'products', pathMatch:'full'},
    {path: 'products', component: ProductsComponent},
    {path: 'products/create', component: ProductCreateComponent},
    {path: 'products/edit/:id', component: ProductEditComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'orders/:id', component: OrderDetailComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
