import { Component, OnDestroy, OnInit } from '@angular/core';
import { CusStoreService } from '../cus-store.service';
import { Subscription } from 'rxjs';
import { Order, OrderItem, OrderStatus } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  numOfSubscription?: Subscription;
  orderItems: OrderItem[] = []
  currentOrder!: Order;
  totalPrice: number = 0;
  constructor(private store: CusStoreService,private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    this.numOfSubscription = this.store.getOrder(this.route.snapshot.paramMap.get('id')!).subscribe({
      next: (res) => {
        if(res)
        {
        this.currentOrder = res
        if(this.currentOrder)
        {
        this.numOfSubscription = this.store.getOrderItems(this.currentOrder.id!).subscribe({
          next: (res) => {
            this.totalPrice = 0;
            this.orderItems = res;
            res.forEach(item => {
              this.totalPrice += item.price * item.quantity
            });
            console.log(this.orderItems)
          }
        })
      }
    }
  }
    })
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
  ngOnDestroy(): void {
    if(this.numOfSubscription)
    {
      this.numOfSubscription.unsubscribe();
    }
  }
  placeOrder()
  {
    const newOrder = {...this.currentOrder!};
    newOrder.orderDate = new Date()
    newOrder.totalPrice = this.totalPrice;
    newOrder.status = OrderStatus.Process;
    this.store.updateOrder(this.currentOrder?.id!, newOrder)
    this.router.navigate(['order'])
  }
}
