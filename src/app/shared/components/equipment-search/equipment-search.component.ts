import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { CategoryService } from '../../services/category/category.service';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { Observable, Subject } from 'rxjs';
import { SetService } from '../../services/set/set.service';
import { Set } from '../../models/set.model';
import { EquipmentSearchCriteria } from '../../models/equipment-search.model';

@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EquipmentSearchComponent implements OnInit, OnDestroy {

  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();

  searchForm: FormGroup;
  minDate: Moment;
  maxDate: Moment;
  categories: Category[];
  sets: Set[];
  filteredCategories$: Observable<Category[]>;
  filteredSets$: Observable<Set[]>;

  @Output() search: EventEmitter<EquipmentSearchCriteria> = new EventEmitter<EquipmentSearchCriteria>();

  constructor(
    private _formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _setService: SetService
  ) {
    this.minDate = moment().year(1961);
    this.maxDate = moment();
  }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      name: [''],
      productionDateFrom: [moment().year(1961)],
      productionDateTo: [moment()],
      serialNumber: [''],
      category: [''],
      set: ['']
    });

    this._categoryService.list$
      .pipe(
        takeUntil(this._unsubscribe$),
        map((categories: Category[]): Category[] =>
          categories.filter((category: Category): boolean => category.active)
        )
      )
      .subscribe((response: Category[]): void => {
        this.categories = response.sort((a: Category, b: Category): number => a.name.localeCompare(b.name));
      });

    this.filteredCategories$ = this.searchForm.get('category').valueChanges
      .pipe(
        startWith(''),
        map((value: string): Category[] => this._filterCategories(value))
      );

    this._setService.list$
      .pipe(
        takeUntil(this._unsubscribe$),
        map((sets: Set[]): Set[] =>
          sets.filter((set: Set): boolean => set.active)
        )
      )
      .subscribe((response: Set[]): void => {
        this.sets = response.sort((a: Set, b: Set): number => a.name.localeCompare(b.name));
      });

    this.filteredSets$ = this.searchForm.get('set').valueChanges
      .pipe(
        startWith(''),
        map((value: string): Set[] => this._filterSets(value))
      );
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

  onYearSelected = (normalizedYear: Moment, datePicker: MatDatepicker<any>, formControlName: string): void => {
    this.searchForm.get(formControlName)
      .setValue(
        this.searchForm.get(formControlName).value.year(normalizedYear.year())
      );
    datePicker.close();
  }

  categoryDisplay = (category: Category): string => category ? category.name : '';

  setDisplay = (set: Set): string => set ? set.name : '';

  reset = (): void => {
    this.searchForm.reset();
  }

  submit = (): void => {
    this.search.emit(this.searchForm.value);
  }

  private _filterCategories = (value: any): Category[] => this._filterDropdownOptions(this.categories, value);

  private _filterSets = (value: any): Set[] => this._filterDropdownOptions(this.sets, value);

  private _filterDropdownOptions = <T extends Category | Set>(options: T[], value: any): T[] => {
    if (value) {
      return options
        .filter((option: T): boolean => option.name.toLowerCase()
          .includes(value.name ? value.name.toLowerCase() : value.toLowerCase())
        );
    }
    return options;
  }
}