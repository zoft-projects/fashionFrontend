import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../redux/cart.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login:any=true
  isAdmin: boolean = false;
  cartCount: number = 0;

  constructor(private router:Router,private cdr: ChangeDetectorRef,private wbs:WebsocketService,private store:Store){}

  ngOnInit(): void {
    const token=localStorage.getItem("token")
    if(token){
      this.login=false
      const user = JSON.parse(localStorage.getItem("user") || '{}');
      this.isAdmin = this.hasRole(user.role, ['admin', 'super-admin', 'field-staff']);    }
    else
    {
      this.login=true
    }

    this.wbs.listen('cart-updated', (count: number) => {
      this.cartCount = count;
    });
  }

  viewBag(){
    this.wbs.emit('reset-cart', {});
  }
  

  logout(){
    console.log("Logout called");
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("cartState")
    localStorage.removeItem("notifications")
    localStorage.removeItem("shippingAddress")

    this.login=true
    this.isAdmin=false
    this.cdr.detectChanges();
    this.router.navigateByUrl("/")
  }
  hasRole(userRole: string, allowedRoles: string[]): boolean {
    return allowedRoles.includes(userRole);
  }
}
