import { AfterContentInit, Component, OnInit } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabbed-pane',
  templateUrl: './tabbed-pane.component.html',
  styleUrls: ['./tabbed-pane.component.scss']
})
export class TabbedPaneComponent implements AfterContentInit {

  tabs: TabComponent[] = [];

  ngAfterContentInit(): void {
    for (const tab of this.tabs) {
      tab.visible = false;
    }
    this.tabs[0].visible = true;
  }

  activate(tabToActivate: TabComponent) {
    for (const tab of this.tabs) {
      tab.visible = (tab === tabToActivate);
    }
  }

  register(tabs: TabComponent): void {
    this.tabs.push(tabs);
  }

}
