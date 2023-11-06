import { Component, OnDestroy, OnInit } from '@angular/core';
import { CusStoreService } from '../cus-store.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Order, OrderStatus } from 'src/app/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  numOfSubcription?: Subscription;
  userId?: string | null;
  orderList: Order[] = []
 
  constructor(private store: CusStoreService,private auth: AuthService){}


  async ngOnInit(): Promise<void> {
    this.userId = await this.auth.getuserId()
    this.numOfSubcription = this.store.getOrders(this.userId!).subscribe({
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
}
