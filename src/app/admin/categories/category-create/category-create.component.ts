import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StoreService } from '../../store.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  form!: FormGroup;

  @Output()
  toggleCreateCategoryEvent: EventEmitter<boolean> = new EventEmitter();
  constructor(private store: StoreService, private fb: FormBuilder){}
  toggleView()
  {
    this.toggleCreateCategoryEvent.emit();
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      'name': [null, {
        validators: [Validators.required, this.whitespaceValidator]
      }]
    })
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
  onCreate()
  {
    const NewCate: Category = {title: this.form.value.name}
    this.store.createCategory(NewCate);
    this.toggleView();
  }
}
