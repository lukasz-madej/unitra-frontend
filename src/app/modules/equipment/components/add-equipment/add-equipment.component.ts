import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageUploadType } from '../../../../shared/models/image-upload.model';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss']
})
export class AddEquipmentComponent {

  id: number;
  type: ImageUploadType;

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id;
    this.type = data.type;
  }
}
