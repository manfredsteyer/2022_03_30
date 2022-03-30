import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

type OnChanged = (value: unknown) => void;
type OnTouched = () => void;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit, OnChanges, ControlValueAccessor {
  // @Input() date: string | null = null;
  // @Output() dateChange = new EventEmitter<string>();

  onChanged: OnChanged | undefined;
  onTochted: OnTouched | undefined;

  day: number | null = null;
  month: number | null = null;
  year: number | null = null;
  hour: number | null = null;
  minute: number | null = null;

  constructor(private control: NgControl) {
    control.valueAccessor = this;
  }

  writeValue(dateStr: string): void {

    if (!dateStr) {
      return;
    }

    const date = new Date(dateStr);
    this.day = date.getDate();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
  }

  registerOnChange(fn: OnChanged): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: OnTouched): void {
    this.onTochted = fn;
  }

  ngOnInit() {
    // console.debug('date in ngOnInit', this.date);
  }

  ngOnChanges() {
    // console.debug('date in ngOnChanges', this.date);

    // if (!this.date) {
    //   return;
    // }

    // const date = new Date(this.date);
    // this.day = date.getDate();
    // this.month = date.getMonth() + 1;
    // this.year = date.getFullYear();
    // this.hour = date.getHours();
    // this.minute = date.getMinutes();
  }

  apply() {
    if (!this.year || !this.month || !this.day || !this.hour || !this.minute) {
      return;
    }

    const date = new Date(this.year, this.month - 1, this.day, this.hour, this.minute);
    //this.dateChange.next(date.toISOString());

    if (this.onChanged) {
      this.onChanged(date);
    }
  }
}
