import { Component, Input, OnInit, Optional } from '@angular/core';
import { TabbedPaneComponent } from '../tabbed-pane/tabbed-pane.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {

  @Input() title = '';
  visible = true;

}
