import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { Category } from '../../../../shared/models/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  categoryForm: FormGroup;

  get name(): AbstractControl {
    return this.categoryForm.get('name');
  }
  get description(): AbstractControl {
    return this.categoryForm.get('description');
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private _formBuilder: FormBuilder,
    private _mdDialogRef: MatDialogRef<EditCategoryComponent>,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this._formBuilder.group({
      name: [this.data.name, [Validators.required]],
      description:  [this.data.description],
      active: [this.data.active]
    });
  }

  onAdd = (): void => {
    if (this.categoryForm.valid) {
      this._categoryService.edit(this.data.id, this.categoryForm.value)
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
