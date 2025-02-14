export interface Order {
    shippingAddress: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    _id: string;
    user: string;
    products: any[];
    orderDate:Date;
    totalPrice:string;
    paymentStatus:string;
    status: string;
  }
  
  export interface OrdersResponse {
    allOrders: Order[];
    message: string;
    status: number;
  }
  