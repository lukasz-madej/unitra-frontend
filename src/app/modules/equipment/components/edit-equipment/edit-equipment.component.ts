import { Component, Inject, OnInit } from '@angular/core';
import { Image, ImageType } from '../../../../shared/models/image.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ImageService } from '../../../../shared/services/image/image.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EquipmentService } from '../../../../shared/services/equipment/equipment.service';
import { take } from 'rxjs/operators';
import { Equipment } from '../../../../shared/models/equipment.model';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.scss']
})
export class EditEquipmentComponent implements OnInit {

  id: number;
  type: ImageType;
  equipment: Equipment;
  images: Image[];
  equipmentForm: FormGroup;
  minDate: Moment;
  maxDate: Moment;

  constructor(
    private _imageService: ImageService,
    private _matDialogRef: MatDialogRef<EditEquipmentComponent>,
    private _formBuilder: FormBuilder,
    private _equipmentService: EquipmentService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.id = data.id;
    this.type = ImageType.EQUIPMENT;
    this.equipment = data;
    this.images = data.images;
    this.minDate = moment().year(1961);
    this.maxDate = moment();
  }

  ngOnInit(): void {
    this.equipmentForm = this._formBuilder.group({
      name: [this.equipment.name, [Validators.required]],
      description:  [this.equipment.description],
      serialNumber: [this.equipment.serialNumber],
      productionDate: [this.equipment.productionDate],
      category: [this.equipment.category ? this.equipment.category.id : null],
      set: [this.equipment.set ? this.equipment.set.id : null]
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

  onSave = (): void => {
    if (this.equipmentForm.valid) {
      this._equipmentService.edit(this.id, this._preparePayload(this.equipmentForm.value, this.images), { modal: true })
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
      categoryId: category && category.selector ? category.selector.id : null,
      setId: set && set.selector ? set.selector.id : null,
      images: images.map((image: Image): number => image.id)
    };
  }

}
