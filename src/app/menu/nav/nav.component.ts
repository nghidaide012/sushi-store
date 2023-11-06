import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CusStoreService } from '../cus-store.service';
import { Category } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  numofSubcription?: Subscription;
  categoryList: Category[] = []

  @Output()
  getCategoryIdEvent: EventEmitter<string> = new EventEmitter();

  constructor(private store: CusStoreService){}
  ngOnInit(): void {
    this.numofSubcription = this.store.getCategories().subscribe({
      next: (res) => {
        this.categoryList = res;
      }
    })
  }
  ngOnDestroy(): void {
    if(this.numofSubcription) {
      this.numofSubcription.unsubscribe();
    }
  }

  getCategoryId(id: string)
  {
    this.getCategoryIdEvent.emit(id)
  }

}
