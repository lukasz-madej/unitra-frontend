import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Set } from '../../models/set.model';
import { ApiService } from '../../../core/api/services/api.service';
import { ErrorService } from '../error/error.service';
import { map, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  private _list$: BehaviorSubject<Set[]> = new BehaviorSubject<Set[]>([]);

  get list$(): Observable<Set[]> {
    return this._list$;
  }

  constructor(
    private _api: ApiService,
    private _errorService: ErrorService
  ) { }

  getList = (): void => {
    this._api.get('sets')
      .pipe(
        take(1),
        map((response: any): Set[] => response.map(this.mapItem))
      )
      .subscribe((response: Set[]): void => {
        this._list$.next(response);
      }, (error: HttpErrorResponse): void => {
        this._errorService.handleApiError(error, 'Błąd podczas ładowania zestawów.');
      });
  }

  mapItem = (item: any): Set => {
    const { id, name, description, created_at, updated_at, active } = item;

    return {
      id,
      name,
      description,
      active,
      createdAt: new Date(created_at),
      updatedAt: new Date(updated_at)
    };
  }
}
