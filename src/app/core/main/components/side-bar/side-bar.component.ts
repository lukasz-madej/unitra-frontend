import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../../../shared/models/category.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();

  categories: Category[];

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoryService.list$
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((response: Category[]): void => {
        this.categories = response.sort((a: Category, b: Category): number => a.name.localeCompare(b.name));
      });
  }

}
