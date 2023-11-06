import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Subscription } from 'rxjs';
import { Category, Product } from 'src/app/models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  numofSubcription?: Subscription;
  productList: Product[] = []
  categoryList: Category[] = []

  constructor(private store: StoreService){}

  ngOnInit(): void {
    this.numofSubcription = this.store.getProducts().subscribe({
      next: (res) => {this.productList = res}
    })
    this.numofSubcription = this.store.getCategories().subscribe({
      next: (res) => {this.categoryList = res}
    })
  }
  ngOnDestroy(): void {
    if(this.numofSubcription)
    {
      this.numofSubcription.unsubscribe()
    }
  }

  getCategoryName(id: string)
  {
    return this.categoryList.find(category => category.id === id)?.title;
  }

  toggleProductStatus(id: string | undefined)
  {
    if(id){
    var newProduct = this.productList.find(product => product.id === id);
    if(newProduct)
    {
      newProduct.active = !newProduct.active;
      this.store.updateProduct(newProduct, id);
    }
  }
    
  }

  deleteProduct(id:string)
  {
    if(id)
    {
      this.store.deleteProduct(id);
    }
  }
}
