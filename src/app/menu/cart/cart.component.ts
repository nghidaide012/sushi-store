import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CusStoreService } from '../cus-store.service';
import { Subscription } from 'rxjs';
import { Order, OrderItem, OrderStatus } from 'src/app/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  numofSubcription?: Subscription;
  @Input()
  currentCart?: Order;
  cartItem: OrderItem[] = []
  totalPrice: number = 0;

  constructor(private store: CusStoreService){}
  ngOnInit(): void {
    console.log(this.currentCart)
    this.numofSubcription = this.store.getOrderItems(this.currentCart?.id!).subscribe({
      next: (res) => {
        this.totalPrice = 0
        this.cartItem = res;
        res.forEach(item => {
          this.totalPrice += item.price * item.quantity
        });
      }
    })
  }
  ngOnDestroy(): void {
    if(this.numofSubcription)
    {
      this.numofSubcription.unsubscribe()
    }
  }

  deleteItem(id: string)
  {
    this.store.deleteOrderItem(id);
  }

  increaseQuantity(item: OrderItem)
  {
    const newItem = {...item}
    newItem.quantity++
    this.store.updateOrderItem(item.id!, newItem)
  }
 decreaseQuantity(item: OrderItem)
  {
    const newItem = {...item}
    newItem.quantity--
    if(newItem.quantity > 0)
    {
    this.store.updateOrderItem(item.id!, newItem)
    }
    else
    {
      this.store.deleteOrderItem(item.id!)
    }
  }
}
