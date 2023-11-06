import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  numofSubcription?: Subscription;
  categories: Category[] = [];
  createStatus: boolean = false;
  editStatus: boolean = false;
  EditCategory!: Category;
  constructor(private store: StoreService){}
  ngOnInit(): void {
    this.numofSubcription = this.store.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      }
    })
  }
  ngOnDestroy(): void {
    if(this.numofSubcription)
    {
      this.numofSubcription.unsubscribe()
    }
  }
  deleteCategory(id: string | undefined) 
  {
    if(id)
    {
      this.numofSubcription = this.store.deleteProductsOfCategory(id).subscribe();
    }
  }
  toggleCreate()
  {
    this.createStatus = !this.createStatus 
  }
  toggleEdit(category: Category)
  {
    this.editStatus = !this.editStatus 
    this.EditCategory = category
    console.log(category)
  }
  toggleEditView()
  {
    this.editStatus = !this.editStatus
  }
}
