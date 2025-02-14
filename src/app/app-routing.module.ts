import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { RegisterComponent } from './shared/pages/register/register.component';
import { adminGuard } from './core/auth/admin.guard';
import { MenComponent } from './shared/pages/men/men.component';
import { WomenComponent } from './shared/pages/women/women.component';
import { AllComponent } from './shared/pages/all/all.component';
import { SingleViewComponent } from './shared/pages/single-view/single-view.component';
import { BagComponent } from './shared/pages/bag/bag.component';
import { ShippingComponent } from './shared/pages/shipping/shipping.component';
import { PaymentComponent } from './shared/pages/payment/payment.component';
import { OrderComponent } from './shared/pages/order/order.component';
import { ProfileComponent } from './shared/pages/profile/profile.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'men',component:MenComponent},
  {path:'women',component:WomenComponent},
  {path:'all',component:AllComponent},
  {path:'single-view/:_id',component:SingleViewComponent},
  {path:'bag',component:BagComponent},
  {path:'shipping',component:ShippingComponent},
  {path:'payment',component:PaymentComponent},
  {path:'order',component:OrderComponent},
  {path:'profile',component:ProfileComponent},
  { path: 'dashboard',canActivate:[adminGuard], loadChildren: () => import('./shared/modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  {path:'**',redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
