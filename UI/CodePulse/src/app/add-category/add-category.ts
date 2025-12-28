import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../features/category/Model/category.model';
import { CategoryService } from '../features/category/services/category-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  private router = inject(Router);
  constructor() {
    effect(() => {
      if (this.categoryService.addCategoryStatus() === 'success') {
        this.categoryService.addCategoryStatus.set('idle');
        this.router.navigateByUrl('/admin/categories');
        console.log('Success');
        //Redirect back to category list page
      }
      if (this.categoryService.addCategoryStatus() === 'error') {
        console.error('Add Category Request Failed');
      }
      //Show error message
    });
  }
  private categoryService = inject(CategoryService);
  // 1) Import ReactiveForms Module
  // 2) FormGroups -> FormControls

  addCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
  });

  get nameFormControl() {
    return this.addCategoryFormGroup.controls.name;
  }
  get urlHandleFormControl() {
    return this.addCategoryFormGroup.controls.urlHandle;
  }

  onSubmit() {
    const addCategoryFormGroupValue = this.addCategoryFormGroup.getRawValue();
    const AddCategoryRequestDto: AddCategoryRequest = {
      name: addCategoryFormGroupValue.name,
      urlHandle: addCategoryFormGroupValue.urlHandle,
    };

    this.categoryService.addCategory(AddCategoryRequestDto);
  }
}
