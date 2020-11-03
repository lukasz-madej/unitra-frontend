import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss'],
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

  get value(): any {
    return this.form.value;
  }

  set value(value: any) {
    if (value) {
      this.form.setValue(value);
      this.onChange(value);
      this.onTouched();
    }
  }

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
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
    this.value = { yearPicker: normalizedYear };
    datePicker.close();
  }

  clearDate = (): void => {
    this.form.reset();
  }
}
