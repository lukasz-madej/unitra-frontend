import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Image, ImageType } from '../../../../shared/models/image.model';
import { ImageService } from '../../../../shared/services/image/image.service';
import { take } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { EquipmentService } from '../../../../shared/services/equipment/equipment.service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss']
})
export class AddEquipmentComponent implements OnInit {

  id: number;
  type: ImageType;
  images: Image[];
  equipmentForm: FormGroup;
  minDate: Moment;
  maxDate: Moment;

  constructor(
    private _imageService: ImageService,
    private _matDialogRef: MatDialogRef<AddEquipmentComponent>,
    private _formBuilder: FormBuilder,
    private _equipmentService: EquipmentService
  ) {
    this.id = null;
    this.type = ImageType.EQUIPMENT;
    this.images = [];
    this.minDate = moment().year(1961);
    this.maxDate = moment();
  }

  ngOnInit(): void {
    this.equipmentForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description:  [''],
      serialNumber: [''],
      productionDate: [''],
      category: [''],
      set: ['']
    });
  }

  getFormControl = (key: string): AbstractControl =>
    this.equipmentForm.get(key)

  onUpload = (event: Image): void => {
    this.images.push(event);
  }

  onDelete = (event: Image): void => {
    this._imageService.remove(event.id, { modal: true })
      .pipe(
        take(1)
      )
      .subscribe((): void => {
        this.images = this.images.filter((image: Image): boolean => image.id !== event.id);
      });
  }

  onAdd = (): void => {
    if (this.equipmentForm.valid) {
      this._equipmentService.add(this._preparePayload(this.equipmentForm.value, this.images), { modal: true })
        .subscribe((): void => {
          this._close();
        });
    }
  }

  onCancel = (): void => {
    this._close();
  }

  private _close = (): void => {
    this._matDialogRef.close();
  }

  private _preparePayload = (form: any, images: Image[]): any => {
    const { name, description, serialNumber, productionDate, category, set } = form;

    return {
      name,
      description,
      serialNumber,
      productionDate,
      categoryId: category ? category.selector : null,
      setId: set ? set.selector : null,
      images: images.map((image: Image): number => image.id)
    };
  }
}
