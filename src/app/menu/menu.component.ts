import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CusStoreService } from './cus-store.service';
import { Order, OrderItem, OrderStatus, Product } from '../models';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  numofSubcription?: Subscription;
  categoryId: string = '';
  productList: Product[] = []
  userId!: string | null;
  loginStatus!: boolean;
  customerCart?: Order;
  cartItem?: OrderItem[];

  constructor(private store: CusStoreService, private auth: AuthService, private router: Router){}
  async ngOnInit(): Promise<void> {
    this.listingProduct()
    this.userId = await this.auth.getuserId();
    this.numofSubcription = this.auth.loginStatus$.subscribe({next: (res) => {this.loginStatus = res; }})
    this.numofSubcription = this.store.getOrders(this.userId!).subscribe({
      next: (res) => {
        res.forEach(order => {
          if(order.status === OrderStatus.Cart )
          {
            this.customerCart = order;
            this.getCartItem();
          }
        });
        if(!this.customerCart && this.userId)
        {
          this.store.generateCart(this.userId)
        }
      }
    })
  }

  getCartItem()
  {
    if(this.customerCart)
    {
      this.numofSubcription = this.store.getOrderItems(this.customerCart.id!).subscribe({
        next: (res) => {
          this.cartItem = res
          console.log(this.cartItem)
        }
      })
    }
  }
  listingProduct()
  {
    this.numofSubcription?.unsubscribe();
    this.productList = []
    if(this.categoryId === '')
    {
      this.numofSubcription = this.store.getProducts().subscribe({
        next: (res) => {
          this.productList = res;
        }
      })
    }
    else
    {
      this.numofSubcription = this.store.getProductsOfCategory(this.categoryId).subscribe({
        next: (res) => {
          this.productList = res
        }
      })
    }
  }
  addToCart(id: string, name: string, price: number, imageUrl: string)
  {
    if(this.loginStatus && this.customerCart)
    {
      var check = false;
      if(this.cartItem)
      {
        this.cartItem.forEach(item => {
          if(item.itemId === id)
          {
            const updateItem = {...item};
            updateItem.quantity++;
            this.store.updateOrderItem(updateItem.id!, updateItem);
            check = true;
          }
        });
      }
      if(!check){
      const itemCart: OrderItem = {
        OrderId: this.customerCart?.id!,
        itemId: id,
        itemName: name,
        itemUrl: imageUrl,
        quantity: 1,
        price: price
      }
      this.store.createOrderItem(itemCart)
    }
    }
    else
    {
      this.router.navigate(['/auth'])
    }
  }
  updateCategoryId(id: string)
  {
    this.categoryId = id;
    this.listingProduct();
  }
  ngOnDestroy(): void {
    if(this.numofSubcription)
    {
      this.numofSubcription.unsubscribe();
    }
  }
}
