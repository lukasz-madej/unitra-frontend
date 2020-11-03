import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../../shared/services/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;

  get name(): AbstractControl {
    return this.categoryForm.get('name');
  }
  get description(): AbstractControl {
    return this.categoryForm.get('description');
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _mdDialogRef: MatDialogRef<AddCategoryComponent>,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description:  [''],
      active: [true]
    });
  }

  onAdd = (): void => {
    if (this.categoryForm.valid) {
      this._categoryService.add(this.categoryForm.value, { modal: true })
        .subscribe((): void => {
          this._close();
        });
    }
  }

  onCancel = (): void => {
    this._close();
  }

  private _close = (): void => {
    this._mdDialogRef.close();
  }
}
