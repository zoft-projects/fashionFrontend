import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './shared/pages/home/home.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { RegisterComponent } from './shared/pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth';
import { MenComponent } from './shared/pages/men/men.component';
import { WomenComponent } from './shared/pages/women/women.component';
import { AllComponent } from './shared/pages/all/all.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SingleViewComponent } from './shared/pages/single-view/single-view.component';
import { BagComponent } from './shared/pages/bag/bag.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { cartReducer } from './shared/redux/cart.reducer';
import { ShippingComponent } from './shared/pages/shipping/shipping.component';
import { shippingReducer } from './shared/redux/shipping/shipping.reducer';
import { PaymentComponent } from './shared/pages/payment/payment.component';
import { paymentReducer } from './shared/redux/payment/payment.reducer';
import { OrderComponent } from './shared/pages/order/order.component';
import { ProfileComponent } from './shared/pages/profile/profile.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MenComponent,
    WomenComponent,
    AllComponent,
    FooterComponent,
    SingleViewComponent,
    BagComponent,
    ShippingComponent,
    PaymentComponent,
    OrderComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({cart:cartReducer,shipping: shippingReducer,payment:paymentReducer}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HighchartsChartModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
