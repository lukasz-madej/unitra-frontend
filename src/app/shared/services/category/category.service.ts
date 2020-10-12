import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { SnackBarService } from '../snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _list$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  get list$(): Observable<Category[]> {
    return this._list$;
  }

  constructor(private _api: ApiService, private _snackBarService: SnackBarService) { }

  getList = (): void => {
   this._api.get('categories')
      .pipe(
        take(1),
        map((response: any): Category[] =>
          response.map((item: any): Category => {
            const { id, name, description, created_at, updated_at } = item;

            return {
              id,
              name,
              description,
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

  delete = (id: number, name: string): void => {
    this._api.delete(`categories/${id}`)
      .pipe(
        take(1)
      )
      .subscribe((): void => {
        this.getList();
        this._snackBarService.open(`Kategoria "${name}" została usunięta.`);
      });
  }
}
