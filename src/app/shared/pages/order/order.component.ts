import { AfterViewInit, ChangeDetectorRef, Component,  OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, take } from 'rxjs';
import { selectShippingAddress } from '../../redux/shipping/shipping.selector';
import { selectPaymentStatus } from '../../redux/payment/payment.selector';
import { selectCartItems, selectCartTotalMrp, selectTotalPrice } from '../../redux/cart.selector';
import { CartProduct } from '../../redux/cart.model';
import { UsersService } from '../../services/users.service';
import { clearCart } from '../../redux/cart.actions';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

declare const paypal: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements AfterViewInit{
  shippingAddress$: Observable<any>; 
  paymentMethod$: Observable<'cod' | 'paypal' | null>;
  cartItems$: Observable<CartProduct[]>;
  cartTotalMrp$: Observable<number>;
  cartTotalPrice$:Observable<number>
  showPayPalButton: boolean = false;

  shippingAddress: any;
  paymentMethod: 'cod' | 'paypal' | null = null;
  cartItems: CartProduct[] = [];
  totalPrice: number = 0;


  constructor(private store: Store,private us:UsersService,private router:Router,private cdr: ChangeDetectorRef,private toast:ToastService) {

    this.shippingAddress$ = this.store.select(selectShippingAddress);
    this.paymentMethod$ = this.store.select(selectPaymentStatus);
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotalMrp$ = this.store.select(selectCartTotalMrp);
    this.cartTotalPrice$=this.store.select(selectTotalPrice)

  }


  ngAfterViewInit() {
    this.resolveCartDetails();
  }

  placeOrder() {
    combineLatest([
      this.shippingAddress$,
      this.paymentMethod$,
      this.cartItems$,
      this.cartTotalPrice$
    ])
      .pipe(take(1))
      .subscribe(([shippingAddress, paymentMethod, cartItems, totalPrice]) => {
        const orderData = {
          products: cartItems.map(item => ({
            product: item.productId,
            quantity: item.quantity,
            price: item.price
          })),
          paymentStatus: paymentMethod,
          totalPrice: totalPrice,
          shippingAddress: {
            street: shippingAddress.street,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country
          }
        };
        if(paymentMethod==='paypal'){
          setTimeout(() => {
            this.showPayPalButton = true;
            this.cdr.detectChanges(); 
          });        }
        else{
          this.us.createOrderApi(orderData).subscribe({
            next: response => {
              console.log('Order placed successfully:', response);
              this.toast.showSuccess('Order placed successfully')
              this.store.dispatch(clearCart());
              this.router.navigateByUrl('/profile')
            },
            error: err => {
              console.error('Error placing order:', err);
            }
          });
  
        }
  
      });
  }

  testPayment(){
    console.log('button clicked');
    
    combineLatest([
      this.shippingAddress$,
      this.paymentMethod$,
      this.cartItems$,
      this.cartTotalPrice$
    ])
      .pipe(take(1))
      .subscribe(([shippingAddress, paymentMethod, cartItems, totalPrice]) => {
        const orderData = {
          products: cartItems.map(item => ({
            product: item.productId,
            quantity: item.quantity,
            price: item.price
          })),
          paymentStatus: paymentMethod,
          status:'paid',
          totalPrice: totalPrice,
          shippingAddress: {
            street: shippingAddress.street,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country
          }
        };
        
          this.us.createOrderApi(orderData).subscribe({
            next: response => {
              console.log('Order placed successfully:', response);
              this.toast.showSuccess('Order placed successfully')
              this.store.dispatch(clearCart());
              this.router.navigateByUrl('/profile')
            },
            error: err => {
              console.error('Error placing order:', err);
            }
          });
  
        
  
      });
  }
  resolveCartDetails() {
    combineLatest([
      this.shippingAddress$,
      this.paymentMethod$,
      this.cartItems$,
      this.cartTotalPrice$
    ])
      .pipe(take(1))
      .subscribe(([shippingAddress, paymentMethod, cartItems, totalPrice]) => {
        this.shippingAddress = shippingAddress;
        this.paymentMethod = paymentMethod;
        this.cartItems = cartItems;
        this.totalPrice = totalPrice;

        if (this.paymentMethod === 'paypal') {
          this.showPayPalButton = true;

          setTimeout(() => {
            this.initializePayPalButton();
          });
        }
      });
  }

  initializePayPalButton() {
    const paypalContainer = document.getElementById('paypal-button-container');
    if (!paypalContainer) {
      console.error('PayPal button container not found in the DOM.');
      return;
    }

    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD", 
                  value: this.totalPrice.toString(),
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            const orderData = {
              products: this.cartItems.map((item) => ({
                product: item.productId,
                quantity: item.quantity,
                price: item.price,
              })),
              paymentStatus: 'paid',
              totalPrice: this.totalPrice,
              shippingAddress: {
                street: this.shippingAddress.street,
                city: this.shippingAddress.city,
                postalCode: this.shippingAddress.postalCode,
                country: this.shippingAddress.country,
              },
            };

            this.us.createOrderApi(orderData).subscribe({
              next: (response) => {
                alert(`Order placed successfully!`);
                this.store.dispatch(clearCart());
                this.router.navigateByUrl('/profile');
              },
              error: (err) => {
                console.error('Error creating order:', err);
                alert(
                  'Payment completed, but there was an issue placing the order.'
                );
              },
            });
          });
        },
        onError: (err: any) => {
          console.error('PayPal Error:', err);
        },
      })
      .render('#paypal-button-container');
  }

}
