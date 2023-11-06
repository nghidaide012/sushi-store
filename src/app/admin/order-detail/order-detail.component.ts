import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order, OrderItem, OrderStatus } from 'src/app/models';
import { StoreService } from '../store.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private store: StoreService,private route: ActivatedRoute){}
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

  toggleOrderStatus(order: Order, status: OrderStatus)
  {
    var tempStatus: OrderStatus = status;
    switch(status)
    {
      case OrderStatus.Process: 
        tempStatus = OrderStatus.Prepare;
        break;
      case OrderStatus.Prepare: 
        tempStatus = OrderStatus.Delivering;
        break;
      case OrderStatus.Delivering: 
        tempStatus = OrderStatus.Completed;
        break;
    }
    const newOrder = {...order}
    newOrder.status = tempStatus;
    this.store.updateOrder(order.id!, newOrder);

  }
  ngOnDestroy(): void {
    if(this.numOfSubscription)
    {
      this.numOfSubscription.unsubscribe();
    }
  }
}
