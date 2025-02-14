import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { updateShippingAddress } from '../../redux/shipping/shipping.action';
import { Store } from '@ngrx/store';
import { ShippingAddress } from '../../redux/shipping/shipping.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent {

  constructor(private fb:FormBuilder,private store:Store,private router:Router){}

  shippingForm=this.fb.group({
    street:['',[Validators.required]],
    city:['',[Validators.required]],
    post:['',[Validators.required]],
    country:['',[Validators.required]]
  })

  addShipping(){
    if(this.shippingForm.valid){
      const shippingAddress: ShippingAddress = {
        street: this.shippingForm.value.street!,
        city: this.shippingForm.value.city!,
        postalCode: this.shippingForm.value.post!,
        country: this.shippingForm.value.country!,
      };
      this.store.dispatch(updateShippingAddress({ address: shippingAddress }));
      this.router.navigateByUrl('/payment')
    }
  }
}
