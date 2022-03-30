
/*
<app-data-table [data]="flights">
  <div *appTableField="let data as 'id'"><b>{{data | date:'dd.MM.yyyy HH:mm'}}</b></div>
</app-data-table>
*/

// src/app/shared/controls/data-table/data-table.component.ts

import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { TableFieldDirective } from '../table-field.directive';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() data: Array<any> = [];

  @ContentChildren(TableFieldDirective)
  fields: QueryList<TableFieldDirective> | undefined;

  get fieldList() {
    return this.fields?.toArray();
  }
}

