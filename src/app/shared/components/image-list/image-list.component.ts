import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent {

  @Input() images: Image[];
  @Input() allowDelete: boolean;

  @Output() delete: EventEmitter<Image> = new EventEmitter<Image>();

  constructor() { }

  onDelete = (event: Image): void => {
    this.delete.emit(event);
  }
}
