import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { Category } from '../../../../shared/models/category.model';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialog } from '../../../../shared/models/confirmation-dialog.model';
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesPageComponent implements AfterViewInit {

  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();
  private _actionItem: Category;

  displayedColumns: string[];
  categories: Category[];
  dataSource: MatTableDataSource<Category>;
  confirmationDialogOptions: ConfirmationDialog;
  noData: boolean;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private _categoryService: CategoryService,
    private _confirmationDialogService: ConfirmationDialogService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.displayedColumns = ['id', 'name', 'description', 'createdAt', 'updatedAt', 'actions'];
    this.confirmationDialogOptions = {
      title: 'Czy na pewno chcesz usunąć tę kategorię?',
      message: 'Urządzenia przypisane do tej kategorii nie zostaną usunięte.',
      cancelText: 'Anuluj',
      confirmText: 'Usuń',
      confirmButtonColor: 'warn'
    };
  }

  ngAfterViewInit(): void {
    this._categoryService.list$
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((response: Category[]): void => {
        this.categories = response;
        this.dataSource = new MatTableDataSource<Category>(this.categories);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.noData = this.dataSource.data.length === 0;
        this._changeDetectorRef.detectChanges();
      });
  }

  onEditClick = (event: Category): void => {
    this._actionItem = event;
    console.log('edit click');
  }

  onDeleteClick = (event: Category): void => {
    this._actionItem = event;
    this._confirmationDialogService.open(this.confirmationDialogOptions);

    this._confirmationDialogService.confirmed$()
      .pipe(
        take(1)
      )
      .subscribe((confirmed: boolean): void => {
        if (confirmed) {
          const { id, name } = this._actionItem;
          this._categoryService.delete(id, name);
        }
      });
  }
}
