import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { Set } from '../../../../shared/models/set.model';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialog } from '../../../../shared/models/confirmation-dialog.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog/confirmation-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { SetService } from '../../../../shared/services/set/set.service';
import { take, takeUntil } from 'rxjs/operators';
import { AddSetComponent } from '../../components/add-set/add-set.component';
import { EditSetComponent } from '../../components/edit-set/edit-set.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sets-list-page',
  templateUrl: './sets-list-page.component.html',
  styleUrls: ['./sets-list-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetsListPageComponent implements AfterViewInit {

  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();
  private _actionItem: Set;

  displayedColumns: string[];
  sets: Set[];
  dataSource: MatTableDataSource<Set>;
  confirmationDialogOptions: ConfirmationDialog;
  noData: boolean;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private _setService: SetService,
    private _confirmationDialogService: ConfirmationDialogService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this.displayedColumns = ['id', 'name', 'description', 'createdAt', 'updatedAt', 'active', 'membersCount', 'actions'];
    this.confirmationDialogOptions = {
      title: 'Czy na pewno chcesz usunąć ten zestaw?',
      message: 'Urządzenia przypisane do tego zestawu nie zostaną usunięte.',
      cancelText: 'Anuluj',
      confirmText: 'Usuń',
      confirmButtonColor: 'warn'
    };
  }

  ngAfterViewInit(): void {
    this._setService.list$
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((response: Set[]): void => {
        this.sets = response;
        this.dataSource = new MatTableDataSource<Set>(this.sets);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.noData = this.dataSource.data.length === 0;
        this._changeDetectorRef.detectChanges();
      });
  }

  onAddClick = (): void => {
    this._dialog.open(AddSetComponent);
  }

  onEditClick = (event: Set): void => {
    this._actionItem = event;
    this._dialog.open(EditSetComponent, { data: event });
  }

  onDeleteClick = (event: Set): void => {
    this._actionItem = event;
    this._confirmationDialogService.open(this.confirmationDialogOptions);

    this._confirmationDialogService.confirmed$()
      .pipe(
        take(1)
      )
      .subscribe((confirmed: boolean): void => {
        if (confirmed) {
          const { id, name } = this._actionItem;
          this._setService.delete(id, name);
        }
      });
  }

  onDetailsClick = (event: Set): void => {
    this._router.navigateByUrl(`/private/sets/details/${event.id}`);
  }
}
