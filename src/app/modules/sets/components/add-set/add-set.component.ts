import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SetService } from '../../../../shared/services/set/set.service';

@Component({
  selector: 'app-add-set',
  templateUrl: './add-set.component.html',
  styleUrls: ['./add-set.component.scss']
})
export class AddSetComponent implements OnInit {

  setForm: FormGroup;

  get name(): AbstractControl {
    return this.setForm.get('name');
  }
  get description(): AbstractControl {
    return this.setForm.get('description');
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _mdDialogRef: MatDialogRef<AddSetComponent>,
    private _setService: SetService
  ) { }

  ngOnInit(): void {
    this.setForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description:  [''],
      active: [true]
    });
  }

  onAdd = (): void => {
    if (this.setForm.valid) {
      this._setService.add(this.setForm.value)
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
