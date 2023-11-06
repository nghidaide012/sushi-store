import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category, Product } from 'src/app/models';
import { StoreService } from '../../store.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  numofSubcription?: Subscription;
  categoriesList: Category[] = [];
  form!: FormGroup;
  imageFile!: File;

  constructor(private store: StoreService, private fb: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.numofSubcription = this.store.getCategories().subscribe({
      next: (res) => {this.categoriesList = res; console.log(this.categoriesList)}
    })
    this.form = this.fb.group({
      'name': [null, {
        validators: [Validators.required, this.whitespaceValidator]
      }],
      'description': [null, {
        validators: [Validators.required, this.whitespaceValidator]
      }],
      'image': [null, {
        validators: [Validators.required]
      }],
      'category': [null, {
        validators: [Validators.required]
      }],
      'price': [null, {
        validators: [Validators.required,  Validators.pattern('^[0-9.]+$')]
      }],
      'kCal': [null, {
        validators: [Validators.required,  Validators.pattern('^[0-9.]+$')]
      }],
      'numOfPiece': [null, {
        validators: [Validators.required,  Validators.pattern('^[0-9.]+$')]
      }],
    })

  }
  ngOnDestroy(): void {
    if(this.numofSubcription)
    {
      this.numofSubcription.unsubscribe()
    }
  }
  whitespaceValidator(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && value.trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }
  selectImg(event:Event): void
  {
    const target = event.target as HTMLInputElement;

    if(target.files && target.files[0])
    {
      this.imageFile = target.files[0];
    }
  }
  async onCreate()
  {
    console.log(this.form.value)
    if(this.imageFile)
    {
      const path = 'product/' + this.imageFile.name;
      const productImg = await this.store.uploadImg(path, this.imageFile);
      const newProduct = {
        title: this.form.value.name,
        description: this.form.value.description,
        price: this.form.value.price,
        categoryId: this.form.value.category,
        kCal: this.form.value.kCal,
        numOfPiece: this.form.value.numOfPiece,
        imageUrl: productImg,
        active: true
      }

      this.store.createProducts(newProduct);
      this.form.reset();
      this.router.navigate(['admin/products'])
    }
  }
}
