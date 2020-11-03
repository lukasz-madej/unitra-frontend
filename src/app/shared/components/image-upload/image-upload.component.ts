import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ImageUploadStatus, ImageType, Image } from '../../models/image.model';
import { ImageService } from '../../services/image/image.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnDestroy {

  private readonly _acceptedFileTypes: string[];
  private readonly _maxFileSize: number;
  private _fileError: string;
  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();

  file: File;
  fileUploading: boolean;
  fileProgress: number;

  @Input() id: number;
  @Input() type: ImageType;

  @Output() upload: EventEmitter<Image> = new EventEmitter<Image>();

  set fileError(text: string) {
    this._fileError = text;

    setTimeout((): void => {
      this._fileError = null;
    }, 3000);
  }
  get fileError(): string {
    return this._fileError;
  }

  constructor(private _imageUploadService: ImageService) {
    this._acceptedFileTypes = [
      'image/png',
      'image/jpeg',
      'image/gif'
    ];
    this._maxFileSize = 10485760;

    this.fileUploading = false;
    this.fileProgress = 0;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

  onChange = (event: Event) => {
    this.file = (event.target as HTMLInputElement).files[0];

    if (this._validateImage()) {
      this._uploadImage();
    }
  }

  private _validateImage = (): boolean => {
    if (!this._acceptedFileTypes.includes(this.file.type)) {
      this.fileError = 'Nieprawidłowy typ pliku. Akceptowane rozszerzenia to: .jpg, .jpeg, .gif i .png';
      return false;
    }

    if (this.file.size > this._maxFileSize) {
      this.fileError = 'Zbyt duży rozmiar pliku. Maksymalny rozmiar pliku to 10MB';
      return false;
    }
    return true;
  }

  private _uploadImage = (): void => {
    const formData = new FormData();

    if (this.id) {
      formData.append('id', this.id.toString());
    }

    formData.append('type', this.type);
    formData.append('file', this.file);

    this.fileUploading = true;
    this.fileProgress = 0;

    this._imageUploadService.upload(formData)
      .pipe(
        takeUntil(this._unsubscribe$),
        finalize((): void => {
          this.fileUploading = false;
          this._unsubscribe$.next(true);
        })
      )
      .subscribe((response: any): void => {
        switch (response.status) {
          case ImageUploadStatus.PROGRESS:
            this.fileProgress = response.message;
            break;
          case ImageUploadStatus.COMPLETE:
            this.upload.emit(response.message);
            break;
        }
      });
  }
}
