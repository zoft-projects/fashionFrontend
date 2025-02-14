import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from './pipes/search.pipe';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { LogChartComponent } from './log-chart/log-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AllProductsComponent,
    AddProductsComponent,
    SearchPipe,
    AllOrdersComponent,
    LogChartComponent,
    BarChartComponent,
    DonutChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    HighchartsChartModule
  ]
})
export class DashboardModule { }
