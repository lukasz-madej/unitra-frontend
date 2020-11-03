import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { CategoryService } from '../../services/category/category.service';
import { SetService } from '../../services/set/set.service';
import { EquipmentSearchCriteria } from '../../models/equipment-search.model';

@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EquipmentSearchComponent implements OnInit {

  searchForm: FormGroup;
  minDate: Moment;
  maxDate: Moment;

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
  }

  reset = (): void => {
    this.searchForm.reset();
    this.search.emit();
  }

  submit = (): void => {
    this.search.emit(this._parseSearchParams(this.searchForm.value));
  }

  private _parseSearchParams = (params: any): EquipmentSearchCriteria => {
    const { name, productionDateFrom, productionDateTo, serialNumber, category, set } = params;

    return {
      name,
      productionDateFrom,
      productionDateTo,
      serialNumber,
      categoryName: category && category.selector && typeof category.selector === 'string' ? category.selector : null,
      categoryId: category && category.selector && category.selector.id ? category.selector.id : null,
      setName: set && set.selector && typeof set.selector === 'string' ? set.selector : null,
      setId: set && set.selector && set.selector.id ? set.selector.id : null,
    };
  }
}
