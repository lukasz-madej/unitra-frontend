import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api/services/api.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { ErrorService } from '../error/error.service';
import { Image, ImageUploadStatus } from '../../models/image.model';
import { InterceptorMetadata } from '../../models/interceptor-http-params.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _apiService: ApiService, private _errorService: ErrorService) { }

  upload = (formData: FormData, interceptorMetadata: InterceptorMetadata): Observable<any> =>
    this._apiService.post('images/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }, interceptorMetadata)
      .pipe(
        map((event: HttpEvent<any>): any => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round(100 * event.loaded / event.total);
              return { status: ImageUploadStatus.PROGRESS, message: progress };
            case HttpEventType.Response:
              return { status: ImageUploadStatus.COMPLETE, message: this.mapItem(event.body)};
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

  remove = (id: number, interceptorMetadata: InterceptorMetadata): Observable<any> =>
    this._apiService.delete(`images/${id}`, {}, interceptorMetadata)
      .pipe(
        tap({
          error: (error: HttpErrorResponse): void => {
            this._errorService.handleApiError(error, 'Wystąpił błąd podczas usuwania zdjęcia.');
          }
        })
      )

  getThumbnailUrl = (image: Image): string => {
    const url = new URL(image.location);

    return image.hasThumbnail ?
      `${url.origin}/${image.type}/thumb_${url.pathname.replace(`/${image.type}/`, '')}` :
      image.location;
  }

  mapItem = (image: any): Image => {
    const { hasThumbnail, id, location, name, parentId, size, type } = image;

    return {
      hasThumbnail,
      id,
      location,
      name,
      parentId,
      size,
      type
    };
  }
}
