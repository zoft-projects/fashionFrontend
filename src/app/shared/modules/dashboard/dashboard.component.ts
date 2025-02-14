import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { Order } from './all-orders/order.model';
import { ToastService } from '../../services/toast.service';
import { WebsocketService } from '../../services/websocket.service';
import { RoutCheckService } from 'src/app/core/dashServices/rout-check.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  allUsers:any=[]
  allProducts:any=[]
  orders: Order[] = [];
  currentMonth: string = '';
  notifications: any[] = [];


  constructor(private as:AdminService,private router:Router,private toast:ToastService,private wbs:WebsocketService,public routCheckService: RoutCheckService){}

  ngOnInit(): void {
    this.getUsers()
    this.getProducts()
    this.getOrders()
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const today = new Date();
    this.currentMonth = monthNames[today.getMonth()];

    this.getNotifications()

    this.wbs.listen('newOrder', (data: any) => {
      console.log('New order notification:', data);
      this.notifications.push(data);
      this.saveNotifications()
      console.log('Notifications=',this.notifications);  
    });
  }

  getNotifications(): void {
    const storedNotifications = localStorage.getItem('notifications');
    this.notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
  }
  
  saveNotifications(): void {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }
  read(): void {
    this.notifications = [];
    this.saveNotifications();
  }
  getUsers() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    this.as.getUsersApi().subscribe((result: any) => {
      if (user.role === 'admin' || user.role === 'field-staff') {
        this.allUsers = result.allUsers.filter((user: any) => user.role === 'user');
      } 
      else {
        this.allUsers = result.allUsers.filter((user:any)=>user.role!='super-admin'); 
      }
      console.log(this.allUsers);
    });
  }
  
  getProducts(){
    this.as.getProductApi().subscribe((result:any)=>{
      this.allProducts=result.allProducts
      console.log(this.allProducts);
      
    })
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
  deleteUser(id:any){
    this.as.deleteUsersApi(id).subscribe((result:any)=>{
      this.toast.showSuccess('User deleted successfully')
      this.getUsers()
    })
  }

  toggleAdmin(id: string) {
    this.as.updateUserApi(id).subscribe({
      next: (result: any) => {
        console.log(result.message); 
        this.getUsers(); 
      },
      error: (error: any) => {
        console.error("Error updating user role:", error);
      }
    });
  }
  
  logout(){
    console.log("Logout called");
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("cartState")
    localStorage.removeItem("notifications")
    localStorage.removeItem("shippingAddress")
    this.router.navigateByUrl("/")
  }
}
