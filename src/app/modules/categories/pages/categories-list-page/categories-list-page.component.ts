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
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../../components/add-category/add-category.component';
import { EditCategoryComponent } from '../../components/edit-category/edit-category.component';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-list-page.component.html',
  styleUrls: ['./categories-list-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesListPageComponent implements AfterViewInit {

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
    private _changeDetectorRef: ChangeDetectorRef,
    private _dialog: MatDialog
  ) {
    this.displayedColumns = ['id', 'name', 'description', 'createdAt', 'updatedAt', 'active', 'actions'];
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

  onAddClick = (): void => {
    this._dialog.open(AddCategoryComponent);
  }

  onEditClick = (event: Category): void => {
    this._actionItem = event;
    this._dialog.open(EditCategoryComponent, { data: event });
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
