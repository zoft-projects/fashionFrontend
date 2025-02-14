import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { updatePaymentStatus } from '../../redux/payment/payment.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  selectedMethod: 'cod' | 'paypal' | null = null;

  constructor(private store:Store,private router:Router){}

 onSelectMethod(method: 'cod' | 'paypal') {
    this.selectedMethod = method;
    this.store.dispatch(updatePaymentStatus({ paymentStatus: method }));
  }

  continue() {
    if (this.selectedMethod) {
      console.log('Payment method selected:', this.selectedMethod);
      this.router.navigateByUrl('/order')
    }
  }
}
