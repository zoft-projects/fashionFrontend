import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Order } from '../all-orders/order.model';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-log-chart',
  templateUrl: './log-chart.component.html',
  styleUrls: ['./log-chart.component.css']
})
export class LogChartComponent implements OnInit {

  allUsers: any[] = [];
  allProducts: any[] = [];
  orders: Order[] = [];

  constructor(private as: AdminService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getProducts();
    this.getOrders();
  }

  getUsers() {
    this.as.getUsersApi().subscribe((result: any) => {
      this.allUsers = result.allUsers;
      console.log(this.allUsers);
      this.updateChartData(); 
    });
  }

  getProducts() {
    this.as.getProductApi().subscribe((result: any) => {
      this.allProducts = result.allProducts;
      console.log(this.allProducts);
    });
  }

  getOrders() {
    this.as.getAllOrdersApi().subscribe({
      next: (result) => {
        this.orders = result.allOrders;
        console.log(this.orders);
        this.updateChartData(); 
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
      },
    });
  }

  Highcharts: typeof Highcharts = Highcharts;


  chartOptions: Highcharts.Options = {
    title: {
      text: '',
    },
    accessibility: {
      point: {
        valueDescriptionFormat: '{xDescription}{separator}{value} million(s)',
      },
    },
    xAxis: {
      title: {
        text: 'Month',
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map(String),
    },
    yAxis: {
      type: 'logarithmic',
      title: {
        text: 'Products/Users/Orders',
      },
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br />',
      pointFormat: '{point.y} value(s)',
    },
    series: [
      {
        name: 'Users',
        data: [], 
        type: 'line',
        color: '#0000ff',
      },
      {
        name: 'Orders',
        data: [], 
        type: 'line', 
        color: '#ff0000',
      },
    ],
    credits: {
      enabled: false,
    },
  };

  updateChartData() {
    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: 'Users',
          data: Array(7).fill(this.allUsers.length),
          type: 'line',
        },
        {
          name: 'Orders',
          data: Array(7).fill(this.orders.length), 
          type: 'line', 
        },
      ],
    };
  }}
