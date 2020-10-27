import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Set } from '../../models/set.model';
import { ApiService } from '../../../core/api/services/api.service';
import { ErrorService } from '../error/error.service';
import { map, take, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from '../snack-bar/snack-bar.service';

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
    private _snackBarService: SnackBarService,
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

  add = (set: Partial<Set>): Observable<void> => {
    return this._api.post('sets', set)
      .pipe(
        take(1),
        tap((): void => {
          this.getList();
          this._snackBarService.info(`Zestaw "${set.name}" został dodany.`);
        }, (error: HttpErrorResponse): void => {
          this._errorService.handleApiError(error, 'Wystąpił błąd podczas dodawania zestawu.');
        })
      );
  }

  edit = (id: number, set: Partial<Set>): Observable<void> => {
    return this._api.put(`sets/${id}`, set)
      .pipe(
        take(1),
        tap((): void => {
          this.getList();
          this._snackBarService.info(`Zmiany w zestawie "${set.name}" zostały zapisane.`);
        }, (error: HttpErrorResponse): void => {
          this._errorService.handleApiError(error, 'Wystąpił błąd podczas edycji zestawu.');
        })
      );
  }

  delete = (id: number, name: string): void => {
    this._api.delete(`sets/${id}`)
      .pipe(
        take(1)
      )
      .subscribe((): void => {
        this.getList();
        this._snackBarService.info(`Zestaw "${name}" został usunięty.`);
      }, (error: HttpErrorResponse): void => {
        this._errorService.handleApiError(error, 'Wystąpił błąd podczas usuwania zestawu.');
      });
  }

  mapItem = (item: any): Set => {
    const { id, name, description, created_at, updated_at, active, membersCount } = item;

    return {
      id,
      name,
      description,
      active,
      membersCount,
      createdAt: new Date(created_at),
      updatedAt: new Date(updated_at)
    };
  }
}
