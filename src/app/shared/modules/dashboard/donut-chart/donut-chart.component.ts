import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {

  allUsers: any[] = [];
  allProducts: any[] = [];
  orders: any[] = [];
  Highcharts: typeof Highcharts = Highcharts;

  constructor(private as: AdminService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getProducts();
    this.getOrders();
  }

  getUsers() {
    this.as.getUsersApi().subscribe((result: any) => {
      this.allUsers = result.allUsers;
    });
  }

  getProducts() {
    this.as.getProductApi().subscribe((result: any) => {
      this.allProducts = result.allProducts;
    });
  }

  getOrders() {
    this.as.getAllOrdersApi().subscribe({
      next: (result) => {
        this.orders = result.allOrders;
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
      },
    });
  }


  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie', 
    },
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    series: [
      {
        name: 'Share',
        type:'pie',
        data: [
          { name: 'Users', y: 12 }, 
          { name: 'Products', y: 12 },
          { name: 'Orders', y: 25 },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
  };

  updateChartData() {
    if (this.allUsers.length || this.allProducts.length || this.orders.length) {
      this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            name: 'Share',
            type:'pie',
            data: [
              { name: 'Users', y: 12 }, 
              { name: 'Products', y: 10 }, 
              { name: 'Orders', y: 18 },
            ],
          },
        ],
      };
    }
  }
}
