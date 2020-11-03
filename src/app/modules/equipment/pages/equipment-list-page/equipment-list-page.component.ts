import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialog } from '../../../../shared/models/confirmation-dialog.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog/confirmation-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';
import { EditCategoryComponent } from '../../../categories/components/edit-category/edit-category.component';
import { Equipment } from '../../../../shared/models/equipment.model';
import { EquipmentService } from '../../../../shared/services/equipment/equipment.service';
import { EquipmentSearchCriteria } from '../../../../shared/models/equipment-search.model';
import { Router } from '@angular/router';
import { AddEquipmentComponent } from '../../components/add-equipment/add-equipment.component';
import { ImageType } from '../../../../shared/models/image.model';

@Component({
  selector: 'app-equipment-page',
  templateUrl: './equipment-list-page.component.html',
  styleUrls: ['./equipment-list-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EquipmentListPageComponent implements OnInit, AfterViewInit, OnDestroy {

  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();
  private _actionItem: Equipment;

  displayedColumns: string[];
  equipment: Equipment[];
  dataSource: MatTableDataSource<Equipment>;
  confirmationDialogOptions: ConfirmationDialog;
  noData: boolean;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private _equipmentService: EquipmentService,
    private _confirmationDialogService: ConfirmationDialogService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this.displayedColumns = ['id', 'name', 'description', 'serialNumber', 'productionYear', 'category', 'set', 'createdAt', 'updatedAt', 'actions'];
    this.confirmationDialogOptions = {
      title: 'Czy na pewno chcesz usunąć to urządzenie?',
      cancelText: 'Anuluj',
      confirmText: 'Usuń',
      confirmButtonColor: 'warn'
    };
  }

  ngOnInit(): void {
    this._equipmentService.getList();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

  ngAfterViewInit(): void {
    this._equipmentService.list$
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((response: Equipment[]): void => {
        this.equipment = response;
        this.dataSource = new MatTableDataSource<Equipment>(this.equipment);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.noData = this.dataSource.data.length === 0;
        this._changeDetectorRef.detectChanges();
      });
  }

  onAddClick = (): void => {
    this._dialog.open(AddEquipmentComponent, {
      data: {
        id: null,
        type: ImageType.EQUIPMENT
      }
    });
  }

  onEditClick = (event: Equipment): void => {
    this._actionItem = event;
    this._dialog.open(EditCategoryComponent, { data: event });
  }

  onDeleteClick = (event: Equipment): void => {
    this._actionItem = event;
    this._confirmationDialogService.open(this.confirmationDialogOptions);

    this._confirmationDialogService.confirmed$()
      .pipe(
        take(1)
      )
      .subscribe((confirmed: boolean): void => {
        if (confirmed) {
          const { id, name } = this._actionItem;
          // this._equipmentService.delete(id, name);
        }
      });
  }

  onDetailsClick = (event: Equipment): void => {
    this._router.navigateByUrl(`/equipment/details/${event.id}`);
  }

  onSearch = (event: EquipmentSearchCriteria): void => {
    this._equipmentService.getList(event);
  }
}
