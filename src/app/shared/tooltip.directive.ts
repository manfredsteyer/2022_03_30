import {
  Directive,
  EmbeddedViewRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AboutComponent } from '../about/about.component';


@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {

  @Input('appTooltip') template: TemplateRef<unknown> | undefined;

  private viewRef: EmbeddedViewRef<unknown> | undefined;

  constructor(private viewContainer: ViewContainerRef) {
  }

  @HostListener('mouseover')
  mouseOver(): void {

    this.show(true);

  }

  @HostListener('mouseout')
  mouseOut(): void {

    this.show(false);

  }

  ngOnInit(): void {
    if (this.template) {

      this.viewRef = this.viewContainer.createEmbeddedView(this.template, {
        $implicit: 'Tooltip!',
        helpLink: 'http://www.google.com'
      });

      // const ref = this.viewContainer.createComponent(AboutComponent);
      // ref.instance.text = 'Manfred was here!';

      this.show(false);
    }
  }

  private show(show: boolean) {
    if (!this.viewRef) {
      return;
    }

    this.viewRef.rootNodes.forEach(nativeElement => {
      nativeElement.hidden = !show;
    });
  }

}

