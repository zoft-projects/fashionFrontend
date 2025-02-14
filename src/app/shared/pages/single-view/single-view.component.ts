import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItems, selectCartTotalMrp } from '../../redux/cart.selector';
import { CartProduct } from '../../redux/cart.model';
import { addToCart } from '../../redux/cart.actions';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit{

  product:any={}
  randomProducts:any[]=[]
  quantity: number = 1;
  cartItems$: Observable<CartProduct[]>;
  cartTotal$: Observable<number>;

  constructor(private us:UsersService,private ar:ActivatedRoute,private store:Store,private router:Router,private wbs:WebsocketService){
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotalMrp);
  }

  ngOnInit(): void {
    this.getSingleProduct()
    this.getRandomProducts()
  }

  getSingleProduct(){
    this.ar.params.subscribe((data:any)=>{
      this.us.getSingleProductApi(data._id).subscribe({
        next:(result:any)=>{
          this.product=result.product
          console.log(this.product);
          
        },
        error:(data:any)=>{
          console.log(data.error);
          
        }
      })
    })
  }

    arrayBufferToBase64(buffer: number[]): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  getRandomProducts(){
    this.us.getProductApi().subscribe((products:any)=>{
      this.randomProducts=products.allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
      console.log(this.randomProducts);  
    })
  }

  increaseQuantity(): void {
    this.quantity += 1;
  }
  
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  addToBag(){
    const base64Image = 'data:' + this.product.image.type + ';base64,' + this.arrayBufferToBase64(this.product.image.data.data);

    const item: CartProduct = {
      productId: this.product._id,
      name: this.product.name,
      quantity: this.quantity,
      category:this.product.category,
      price: this.product.price,
      image: base64Image, 
    };
  
    this.store.dispatch(addToCart({ product: item }));
    this.wbs.emit('add-to-cart', { quantity: item.quantity });
    console.log('Dispatching Add To Cart Action with Product:', item);
  }
}
