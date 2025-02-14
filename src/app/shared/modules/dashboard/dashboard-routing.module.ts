import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {path:'add',component:AddProductsComponent},
  {path:'allProducts',component:AllProductsComponent},
  {path:'all-orders',component:AllOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
