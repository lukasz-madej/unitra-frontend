import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
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
  sets: Set[];
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
      productionDateFrom: [this.minDate],
      productionDateTo: [this.maxDate],
      serialNumber: [''],
      category: [''],
      set: ['']
    });

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

  setDisplay = (set: Set): string => set ? set.name : '';

  reset = (): void => {
    this.searchForm.reset();
    this.search.emit();
  }

  submit = (): void => {
    this.search.emit(this._parseSearchParams(this.searchForm.value));
  }

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

  private _parseSearchParams = (params: any): EquipmentSearchCriteria => {
    const { name, productionDateFrom, productionDateTo, serialNumber, category, set } = params;

    console.log(params);

    return {
      name,
      productionDateFrom,
      productionDateTo,
      serialNumber,
      categoryName: category && category.autocomplete && typeof category.autocomplete === 'string' ? category.autocomplete : null,
      categoryId: category && category.autocomplete && category.autocomplete.id ? category.autocomplete.id : null,
      setName: set && typeof set === 'string' ? set : null,
      setId: set && set.id ? set.id : null
    };
  }
}
