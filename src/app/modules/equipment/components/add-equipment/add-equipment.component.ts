import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Image, ImageType } from '../../../../shared/models/image.model';
import { ImageService } from '../../../../shared/services/image/image.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss']
})
export class AddEquipmentComponent {

  id: number;
  type: ImageType;
  images: Image[];

  constructor(private _imageService: ImageService, @Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id;
    this.type = data.type;
    this.images = [];
  }

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
}
