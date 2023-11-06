import { Component, OnDestroy, OnInit } from '@angular/core';
import { CusStoreService } from '../cus-store.service';
import { Category, OrderItem, Product } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  numOfSubcription?: Subscription;
  productDetail!: Product;
  categoryName!: Category;

  constructor(private store: CusStoreService,private route: ActivatedRoute,private router: Router){}
  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.numOfSubcription = this.store.getProduct(paramId!).subscribe({
      next: (res) => {
        this.productDetail = res!;
        this.getCategoryName(this.productDetail.categoryId)
      }
    })

  }

  getCategoryName(id: string)
  {
    this.numOfSubcription = this.store.getCategory(id).subscribe({
      next: (res) => {
        this.categoryName = res!
      }
    })
  }
  ngOnDestroy(): void {
    if(this.numOfSubcription)
    {
      this.numOfSubcription.unsubscribe();
    }
  }
}
