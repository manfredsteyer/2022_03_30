import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigatorService } from '../navigator.service';

@Component({
  selector: 'app-tab-navigator',
  templateUrl: './tab-navigator.component.html',
  styleUrls: ['./tab-navigator.component.scss']
})
export class TabNavigatorComponent {

  @Input() currentTab = 1;
  @Output() navigation = new EventEmitter<number>();

  constructor(private navigatorService: NavigatorService) {

  }

  next(): void {
    this.navigation.emit(1);
    this.navigatorService.offset$.next(1);
  }

  prev(): void {
    this.navigation.emit(-1);
    this.navigatorService.offset$.next(-1);
  }
}
