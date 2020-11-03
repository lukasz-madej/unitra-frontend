import { Component, forwardRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearPickerComponent),
      multi: true
    }
  ]
})
export class YearPickerComponent implements OnInit, OnDestroy {

  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();

  form: FormGroup;

  @Input() label: string;
  @Input() placeholder: string;
  @Input() minDate: Moment;
  @Input() maxDate: Moment;
  @Input() required: boolean;

  get value(): any {
    return this.form.value;
  }
  set value(value: any) {
    if (value) {
      this.yearPicker.setValue(value);
      this.onChange(value);
      this.onTouched();
      console.log(this.yearPicker);
    }
  }

  get yearPicker(): AbstractControl {
    return this.form.get('yearPicker');
  }

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const validators = this.required ? [Validators.required] : [];

    this.form = this._formBuilder.group({
      yearPicker: ['']
    });

    this.form.valueChanges
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((value: any): void => {
        this.onChange(value);
        this.onTouched();
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

  onYearSelected = (normalizedYear: Moment, datePicker: MatDatepicker<any>): void => {
    this.value = normalizedYear;
    datePicker.close();
  }

  clearDate = (): void => {
    this.form.reset();
  }
}
