import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Order } from '../all-orders/order.model';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  allUsers: any[] = [];
  allProducts: any[] = [];
  orders: Order[] = [];
  Highcharts: typeof Highcharts = Highcharts; 

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Product, Order, and User Data',
    },
    xAxis: {
      categories: ['Users', 'Products', 'Orders'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Count',
      },
    },
    series: [
      {
        name: 'Data',
        data: [12,12,25], 
        type:'column'
      },
    ],
    credits: {
      enabled: false,
    },
  };

  constructor(private as: AdminService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getProducts();
    this.getOrders();
  }

  getUsers() {
    this.as.getUsersApi().subscribe((result: any) => {
      this.allUsers = result.allUsers;
      console.log(this.allUsers.length);
      
    });
  }

  getProducts() {
    this.as.getProductApi().subscribe((result: any) => {
      this.allProducts = result.allProducts;
      console.log(this.allProducts.length);
      
    });
  }

  getOrders() {
    this.as.getAllOrdersApi().subscribe({
      next: (result) => {
        this.orders = result.allOrders;
        console.log(this.orders.length);
        
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
      },
    });
  }
}
