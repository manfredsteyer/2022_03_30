import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickWithWarning]'
})
export class ClickWithWarningDirective {

  @Input() warning = 'Sure?';
  @Output('appClickWithWarning') clickEvent = new EventEmitter();

  @HostBinding('class') classList = 'btn btn-danger';

  @HostListener('click', ['$event'])
  handleClick($event: MouseEvent): void {

    if ($event.shiftKey || confirm(this.warning)) {
      this.clickEvent.emit();
    }
  }

  // constructor(ref: ElementRef) {
  //   ref.nativeElement.setAttribute('class', 'btn btn-danger');
  // }

}
