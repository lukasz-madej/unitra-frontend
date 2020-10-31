import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api/services/api.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { ErrorService } from '../error/error.service';
import { ImageUploadStatus } from '../../models/image-upload.model';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private _apiService: ApiService, private _errorService: ErrorService) { }

  upload = (formData: FormData): Observable<any> =>
    this._apiService.post('images/upload', formData, {
      reportProgress: true,
      observe: 'events',
      headers: {
        'Content-Type': 'multipart/data-form'
      }
    })
      .pipe(
        map((event: HttpEvent<any>): any => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round(100 * event.loaded / event.total);
              return { status: ImageUploadStatus.PROGRESS, message: progress };
            case HttpEventType.Response:
              return { status: ImageUploadStatus.COMPLETE, message: event.body};
            default:
              return {};
          }
        }),
        tap({
          error: (error: HttpErrorResponse): void => {
            this._errorService.handleApiError(error, 'Wystąpił błąd podczas dodawania zdjęcia.');
          }
        })
      )
}
