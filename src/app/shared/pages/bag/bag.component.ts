import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartProduct } from '../../redux/cart.model';
import { selectCartItems,  selectCartTotalMrp, selectTotalPrice } from '../../redux/cart.selector';
import { removeFromCart } from '../../redux/cart.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css']
})
export class BagComponent implements OnInit{

  cartItems$: Observable<CartProduct[]>;
  cartTotalMrp$: Observable<number>;
  cartTotalPrice$:Observable<number>

  constructor(private store:Store,private router:Router){
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotalMrp$ = this.store.select(selectCartTotalMrp);
    this.cartTotalPrice$=this.store.select(selectTotalPrice)
  }

  ngOnInit(): void {
    this.cartItems$.subscribe((items) => {
      console.log('Cart Items:', items);
    });
  
    this.cartTotalMrp$.subscribe((total) => {
      console.log('Cart Total:', total);
    });
  }

  removeCart(productId: string): void {
    this.store.dispatch(removeFromCart({ productId }));
  }

  checkOut(){
    this.router.navigateByUrl('/shipping')
  }
}
