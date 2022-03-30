import { Directive, HostBinding, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChanged = (value: unknown) => void;
type OnTouched = () => void;

// <input [(ngModel)]="date" appDate name="date"> 

@Directive({
  selector: '[appDate]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateCvaDirective,
      multi: true
    }
  ]
})
export class DateCvaDirective implements ControlValueAccessor {

  onChanged: OnChanged | undefined;
  onTochted: OnTouched | undefined;

  @HostBinding('value') value: string | undefined;

  @HostListener('change', ['$event'])
  changed($event: any) {
    debugger;
    if (this.onChanged) {
      // TODO: Value parsen

      if (!$event.target.value) {
        this.onChanged('');
        return;
      }

      const parts = $event.target.value.split('.');

      if (parts.length < 3) {
        this.onChanged('');
        return;
      }

      const date = new Date(parts[2], parseInt(parts[1]) - 1, parts[0]);
      const iso = date.toISOString();
      this.onChanged(iso);
    }
  }

  @HostListener('blur')
  blur() {
    if (this.onTochted) {
      this.onTochted();
    }
  }

  constructor() { }

  writeValue(value: string): void {
    // TODO: Format value

    if (!value) {
      this.value = value;
      return;
    }

    const date = new Date(value);
    const fmt = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    this.value = fmt;
  }

  registerOnChange(fn: OnChanged): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: OnTouched): void {
    this.onTochted = fn;
  }

}
