import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '../../models/image.model';
import { ImageService } from '../../services/image/image.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent {

  gallery: Array<any>;

  @Input() images: Image[];
  @Input() allowDelete: boolean;

  @Output() delete: EventEmitter<Image> = new EventEmitter<Image>();

  constructor(private _imageService: ImageService) {
    this.gallery = [];
  }

  onDelete = (event: Image): void => {
    this.delete.emit(event);
  }

  getThumbnailUrl = (image: Image): string =>
    this._imageService.getThumbnailUrl(image)
}
