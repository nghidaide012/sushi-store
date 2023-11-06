import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order, OrderStatus } from 'src/app/models';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  numOfSubcription?: Subscription;
  userId?: string | null;
  orderList: Order[] = []
 
  constructor(private store: StoreService){}


  async ngOnInit(): Promise<void> {
    this.numOfSubcription = this.store.getOrders().subscribe({
      next: (res) => {
        const temp: Order[] = []
        res.forEach(item => {
          if(item.status !== OrderStatus.Cart)
          {
            temp.push(item)
          }
        });
        this.orderList = temp
      }
    })
  }
  getDate(test: any){
    return new Date(test.seconds*1000)
  }
  ngOnDestroy(): void {
    if(this.numOfSubcription)
    {
      this.numOfSubcription.unsubscribe();
    }
  }
  deleteOrder(id: string)
  {
    this.store.deleteOrder(id);
  }
}
