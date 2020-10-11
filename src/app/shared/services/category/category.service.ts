import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api/services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _api: ApiService) { }

  getCategoryList = (): Observable<Category[]> => {
    return this._api.get('categories')
      .pipe(
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
      );
  }
}
