import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api/services/api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { ErrorService } from '../error/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _list$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  get list$(): Observable<Category[]> {
    return this._list$;
  }

  constructor(
    private _api: ApiService,
    private _snackBarService: SnackBarService,
    private _errorService: ErrorService
  ) { }

  getList = (): void => {
   this._api.get('categories')
      .pipe(
        take(1),
        map((response: any): Category[] =>
          response.map((item: any): Category => {
            const { id, name, description, created_at, updated_at, active } = item;

            return {
              id,
              name,
              description,
              active,
              createdAt: new Date(created_at),
              updatedAt: new Date(updated_at)
            };
          })
        )
      )
      .subscribe((response: Category[]): void => {
        this._list$.next(response);
      });
  }

  add = (category: Partial<Category>): Observable<void> => {
    return this._api.post('categories', category)
      .pipe(
        take(1),
        tap((): void => {
          this.getList();
          this._snackBarService.info(`Kategoria "${category.name}" została dodana.`);
        }, (error: HttpErrorResponse): void => {
          this._errorService.handleApiError(error, 'Wystąpił błąd podczas dodawania kategorii.');
        })
      );
  }

  edit = (id: number, category: Partial<Category>): Observable<void> => {
    return this._api.put(`categories/${id}`, category)
      .pipe(
        take(1),
        tap((): void => {
          this.getList();
          this._snackBarService.info(`Zmiany w kategorii "${category.name}" zostały zapisane.`);
        }, (error: HttpErrorResponse): void => {
          this._errorService.handleApiError(error, 'Wystąpił błąd podczas edycji kategorii.');
        })
      );
  }

  delete = (id: number, name: string): void => {
    this._api.delete(`categories/${id}`)
      .pipe(
        take(1)
      )
      .subscribe((): void => {
        this.getList();
        this._snackBarService.info(`Kategoria "${name}" została usunięta.`);
      }, (error: HttpErrorResponse): void => {
        this._errorService.handleApiError(error, 'Wystąpił błąd podczas usuwania kategorii.');
      });
  }
}
