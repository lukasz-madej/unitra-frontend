import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Equipment } from '../../models/equipment.model';
import { ApiService } from '../../../core/api/services/api.service';
import { ErrorService } from '../error/error.service';
import { map, take, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SetService } from '../set/set.service';
import { CategoryService } from '../category/category.service';
import { EquipmentSearchCriteria } from '../../models/equipment-search.model';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { ImageService } from '../image/image.service';
import { Image } from '../../models/image.model';
import { InterceptorMetadata } from '../../models/interceptor-http-params.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private _list$: BehaviorSubject<Equipment[]> = new BehaviorSubject<Equipment[]>([]);
  private _query: EquipmentSearchCriteria;

  get list$(): Observable<Equipment[]> {
    return this._list$;
  }

  constructor(
    private _api: ApiService,
    private _errorService: ErrorService,
    private _setService: SetService,
    private _categoryService: CategoryService,
    private _snackBarService: SnackBarService,
    private _imageService: ImageService
  ) {}

  getList = (query: EquipmentSearchCriteria = null): void => {
    this._query = query;

    this._api.get('equipment', query ? query : {})
      .pipe(
        take(1),
        map((response: any): Equipment[] => response.map(this.mapItem))
      )
      .subscribe((response: Equipment[]): void => {
        this._list$.next(response);
      }, (error: HttpErrorResponse): void => {
        this._errorService.handleApiError(error, 'Wystąpił błąd podczas ładowania listy urządzeń.');
      });
  }

  get = (id: number): Observable<Equipment> =>
    this._api.get(`equipment/${id}`)
      .pipe(
        take(1),
        tap({
          error: (error: HttpErrorResponse): void => {
            this._errorService.handleApiError(error, 'Wystąpił błąd podczas ładowania urządzenia.');
          }
        }),
        map((response: any): Equipment => this.mapItem(response))
      )

  edit = (id: number, equipment: any, interceptorMetadata: InterceptorMetadata): Observable<void> => {
    return this._api.put(`equipment/${id}`, equipment, {}, interceptorMetadata)
      .pipe(
        take(1),
        tap((): void => {
          this.getList(this._query);
          this._snackBarService.info(`Urządzenie "${equipment.name}" zostało zapisane.`);
        }, (error: HttpErrorResponse): void => {
          this._errorService.handleApiError(error, 'Wystąpił błąd podczas zapisywania urządzenia.');
        })
      );
  }

  add = (equipment: any, interceptorMetadata: InterceptorMetadata): Observable<void> => {
    return this._api.post('equipment', equipment, {}, interceptorMetadata)
      .pipe(
        take(1),
        tap((): void => {
          this.getList(this._query);
          this._snackBarService.info(`Urządzenie "${equipment.name}" zostało dodane.`);
        }, (error: HttpErrorResponse): void => {
          this._errorService.handleApiError(error, 'Wystąpił błąd podczas dodawania urządzenia.');
        })
      );
  }

  mapItem = (item: any): Equipment => {
    const { id, name, description, productionDate, serialNumber, category, set, created_at, updated_at, images } = item;

    return {
      id,
      name,
      description,
      productionDate,
      serialNumber,
      category: category ? this._categoryService.mapItem(category) : null,
      set: set ? this._setService.mapItem(set) : null,
      createdAt: new Date(created_at),
      updatedAt: new Date(updated_at),
      images: images ? images.map((image: any): Image => this._imageService.mapItem(image)) : []
    };
  }
}
