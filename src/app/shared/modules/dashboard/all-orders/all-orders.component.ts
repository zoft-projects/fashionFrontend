import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Order } from './order.model';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orders: Order[] = [];
  statuses: string[] = ['unpaid', 'paid', 'shipped', 'delivered', 'cancelled'];
  p: number=1;

  constructor(private router:Router,private as:AdminService,private toast:ToastService){}

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this.as.getAllOrdersApi().subscribe({
      next: (result) => {
        this.orders = result.allOrders;
        console.log(this.orders);
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
      },
      
    })
  }
  logout(){
    console.log("Logout called");
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.router.navigateByUrl("/")
  }

  updateOrderStatus(orderId: string, newStatus: string) {
    this.as.updateOrderStatusApi(orderId, newStatus).subscribe({
      next: (response) => {
        console.log('Order status updated:', response);
        this.toast.showSuccess('Order status updated!')
      },
      error: (err) => {
        console.error('Failed to update order status:', err);
        alert('Failed to update order status. Please try again.');
      }
    });
  }
  
}
