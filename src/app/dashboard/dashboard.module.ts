import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { TabsComponent } from '../tabs/tabs.component';
import { SearchFilterPipe } from '../search-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchFilterPipe,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage, TabsComponent]
})
export class DashboardPageModule {}
