import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { CategoryService } from '../../services/category/category.service';
import { AbstractControl, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategorySelectorComponent),
      multi: true
    }
  ]
})
export class CategorySelectorComponent implements OnInit, OnDestroy {

  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();

  categories: Category[];
  filteredCategories$: Observable<Category[]>;
  form: FormGroup;

  @Input() label: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() autocomplete: boolean;

  get value(): any {
    return this.form.value;
  }
  set value(value: any) {
    this.categoryControl.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get categoryControl(): AbstractControl {
    return this.form.get('selector');
  }

  constructor(private _categoryService: CategoryService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const validators = this.required ? [Validators.required] : [];

    this.form = this._formBuilder.group({
      selector: ['', validators]
    });

    this.form.valueChanges
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((value: any): void => {
        this.onChange(value);
        this.onTouched();
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
        this.filteredCategories$ = this.categoryControl.valueChanges
          .pipe(
            startWith(''),
            map((value: string): Category[] => this._filterCategories(value))
          );
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

  onChange = (value: any): void => {};

  onTouched = (): void => {};

  registerOnChange = (fn: any): void => {
    this.onChange = fn;
  }

  registerOnTouched = (fn: any): void => {
    this.onTouched = fn;
  }

  writeValue = (value: string): void => {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  categoryDisplay = (category: Category): string => category ? category.name : '';

  private _filterCategories = (value: any): Category[] => {
    if (value) {
      return this.categories
        .filter((category: Category): boolean => category.name.toLowerCase()
          .includes(value.name ? value.name.toLowerCase() : value.toLowerCase())
        );
    }
    return this.categories;
  }
}
