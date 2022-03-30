// src/app/shared/shared.module.ts

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComponent } from './date/date.component';
import { CityPipe } from './city.pipe';
import { StatusColorPipe } from './status-color.pipe';
import { StatusFilterPipe } from './status-filter.pipe';
import { FormsModule } from '@angular/forms';

// Von der CLI eingefügt
import { CityValidationDirective } from './validation/city-validation.directive';
import { TabComponent } from './tab/tab.component';
import { TabbedPaneComponent } from './tabbed-pane/tabbed-pane.component';
import { TabNavigatorComponent } from './tab-navigator/tab-navigator.component';
import { BadComponent } from './bad/bad.component';
import { ClickWithWarningDirective } from './click-with-warning.directive';
import { TooltipDirective } from './tooltip.directive';
import { DataTableComponent } from './data-table/data-table.component';
import { TableFieldDirective } from './table-field.directive';
import { CustomTemplateOutletDirective } from '../custom-template-outlet.directive';
import { AuthService } from './auth/auth.service';
import { DateCvaDirective } from './date-cva.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    DateComponent,
    CityPipe,
    StatusColorPipe,
    StatusFilterPipe,

    // Von der CLI eingefügt
    CityValidationDirective,
    TabComponent,
    TabbedPaneComponent,
    TabNavigatorComponent,
    BadComponent,
    ClickWithWarningDirective,
    TooltipDirective,
    DataTableComponent,
    TableFieldDirective,
    CustomTemplateOutletDirective,
    DateCvaDirective
  ],
  providers: [
  ],
  exports: [
    DateComponent,
    CityPipe,
    StatusColorPipe,
    StatusFilterPipe,
    FormsModule,
    CommonModule,
    CustomTemplateOutletDirective,

    // Neue Einträge
    CityValidationDirective,
    TabComponent,
    TabbedPaneComponent,
    TabNavigatorComponent,
    BadComponent,
    ClickWithWarningDirective,
    TooltipDirective,
    DataTableComponent,
    TableFieldDirective,
    DateCvaDirective
  ]
})
export class SharedModule {

  static forRoot(config?: unknown): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        // AuthService,
        // {provides: MyConfigClass, useValue: config}
      ]
    };
  }

}
