import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Set } from '../../../../shared/models/set.model';
import { SetService } from '../../../../shared/services/set/set.service';

@Component({
  selector: 'app-edit-set',
  templateUrl: './edit-set.component.html',
  styleUrls: ['./edit-set.component.scss']
})
export class EditSetComponent implements OnInit {

  setForm: FormGroup;

  get name(): AbstractControl {
    return this.setForm.get('name');
  }
  get description(): AbstractControl {
    return this.setForm.get('description');
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Set,
    private _formBuilder: FormBuilder,
    private _mdDialogRef: MatDialogRef<EditSetComponent>,
    private _setService: SetService
  ) { }

  ngOnInit(): void {
    this.setForm = this._formBuilder.group({
      name: [this.data.name, [Validators.required]],
      description:  [this.data.description],
      active: [this.data.active]
    });
  }

  onAdd = (): void => {
    if (this.setForm.valid) {
      this._setService.edit(this.data.id, this.setForm.value)
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
