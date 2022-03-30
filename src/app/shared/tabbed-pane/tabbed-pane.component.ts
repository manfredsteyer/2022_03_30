import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, OnInit, QueryList, ViewChild } from '@angular/core';
import { NavigatorService } from '../navigator.service';
import { TabNavigatorComponent } from '../tab-navigator/tab-navigator.component';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabbed-pane',
  templateUrl: './tabbed-pane.component.html',
  styleUrls: ['./tabbed-pane.component.scss'],
  viewProviders: [NavigatorService]
})
export class TabbedPaneComponent implements AfterContentInit, AfterViewInit {

  // @ContentChild('tab')
  // myTab: TabComponent | undefined;

  // Try hard to prevent @ViewChild(ren)
  @ViewChild(TabNavigatorComponent)
  navigator!: TabNavigatorComponent;

  @ContentChildren(TabComponent)
  tabList!: QueryList<TabComponent>;

  currentTab = 1;

  // tabs: TabComponent[] = [];

  constructor(private navigtorService: NavigatorService) {
    this.navigtorService.offset$.subscribe(offset => {
      this.navigate(offset);
    });
  }

  get tabs(): TabComponent[] {
    return this.tabList.toArray();
  }

  ngAfterContentInit(): void {
    for (const tab of this.tabs) {
      tab.visible = false;
    }
    this.tabs[0].visible = true;
  }

  ngAfterViewInit(): void {
    // Register manually for naviagation event
    // this.navigator.navigation.subscribe(offset => {
    //   this.navigate(offset);
    // });
  }


  activate(tabToActivate: TabComponent) {
    for (const tab of this.tabs) {
      tab.visible = (tab === tabToActivate);
    }

    this.currentTab = this.tabs.indexOf(tabToActivate) + 1;
    this.navigator.currentTab = this.currentTab;
  }

  navigate(offset: number): void {
    let newIndex = this.currentTab - 1 + offset;

    if (newIndex < 0) {
      newIndex = this.tabs.length - 1;
    }

    if (newIndex >= this.tabs.length) {
      newIndex = 0;
    }

    this.activate(this.tabs[newIndex]);
  }

}
