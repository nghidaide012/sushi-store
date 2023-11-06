import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../store.service';
import { Category } from 'src/app/models';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {
  form!: FormGroup;
  
  @Input()
  category!: Category;

  @Output()
  toggleEditCategoryEvent: EventEmitter<boolean> = new EventEmitter();
  constructor(private store: StoreService, private fb: FormBuilder){}
  toggleView()
  {
    this.toggleEditCategoryEvent.emit();
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      'name': [null, {
        validators: [Validators.required, this.whitespaceValidator]
      }]
    })
    this.form.get('name')?.setValue(this.category.title)
  }
  whitespaceValidator(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && value.trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }
  get name()
  {
    return this.form.controls['name'];
  }
  onEdit()
  {
    const NewCate: Category = {title: this.form.value.name}
    this.store.updateCategory(NewCate, this.category.id!);
    this.toggleView();
  }
}
