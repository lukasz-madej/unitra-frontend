import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Set } from '../../models/set.model';
import { SetService } from '../../services/set/set.service';
import { map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-set-selector',
  templateUrl: './set-selector.component.html',
  styleUrls: ['./set-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SetSelectorComponent),
      multi: true
    }
  ]
})
export class SetSelectorComponent implements OnInit, OnDestroy {

  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();

  sets: Set[];
  filteredSets$: Observable<Set[]>;
  form: FormGroup;

  @Input() label: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() autocomplete: boolean;

  get value(): any {
    return this.form.value;
  }
  set value(value: any) {
    this.setControl.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get setControl(): AbstractControl {
    return this.form.get('selector');
  }

  constructor(private _setService: SetService, private _formBuilder: FormBuilder) { }

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

    this._setService.list$
      .pipe(
        takeUntil(this._unsubscribe$),
        map((sets: Set[]): Set[] =>
          sets.filter((set: Set): boolean => set.active)
        )
      )
      .subscribe((response: Set[]): void => {
        this.sets = response.sort((a: Set, b: Set): number => a.name.localeCompare(b.name));
        this.filteredSets$ = this.setControl.valueChanges
          .pipe(
            startWith(''),
            map((value: string): Set[] => this._filterSets(value))
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

  setDisplay = (set: Set): string => set ? set.name : '';

  private _filterSets = (value: any): Set[] => {
    if (value) {
      return this.sets
        .filter((set: Set): boolean => set.name.toLowerCase()
          .includes(value.name ? value.name.toLowerCase() : value.toLowerCase())
        );
    }
    return this.sets;
  }
}
