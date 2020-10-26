import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Equipment } from '../../models/equipment.model';
import { ApiService } from '../../../core/api/services/api.service';
import { ErrorService } from '../error/error.service';
import { map, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SetService } from '../set/set.service';
import { CategoryService } from '../category/category.service';
import { EquipmentSearchCriteria } from '../../models/equipment-search.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private _list$: BehaviorSubject<Equipment[]> = new BehaviorSubject<Equipment[]>([]);

  get list$(): Observable<Equipment[]> {
    return this._list$;
  }

  constructor(
    private _api: ApiService,
    private _errorService: ErrorService,
    private _setService: SetService,
    private _categoryService: CategoryService
  ) { }

  getList = (query: EquipmentSearchCriteria = null): void => {
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

  mapItem = (item: any): Equipment => {
    const { id, name, description, productionDate, serialNumber, category, set, created_at, updated_at } = item;

    return {
      id,
      name,
      description,
      productionDate,
      serialNumber,
      category: category ? this._categoryService.mapItem(category) : null,
      set: set ? this._setService.mapItem(set) : null,
      createdAt: new Date(created_at),
      updatedAt: new Date(updated_at)
    };
  }
}
