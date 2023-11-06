import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { StoreService } from './store.service';
import { AdminComponent } from './admin.component';
import { NavComponent } from './nav/nav.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


@NgModule({
  declarations: [
    AdminComponent,
    NavComponent,
    ProductsComponent,
    CategoriesComponent,
    CategoryEditComponent,
    CategoryCreateComponent,
    ProductCreateComponent,
    ProductEditComponent,
    OrdersComponent,
    OrderDetailComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    StoreService
  ]
})
export class AdminModule { }
