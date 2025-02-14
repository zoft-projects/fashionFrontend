import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdersResponse } from '../modules/dashboard/all-orders/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  base_url="http://localhost:8000/api/admin"

  constructor(private http:HttpClient) { }


  getUsersApi(){
    return this.http.get(`${this.base_url}/get_users`)
  }

  deleteUsersApi(id:any){
    return this.http.delete(`${this.base_url}/delete_user/${id}`)
  }

  updateUserApi(id:any){
    return this.http.put(`${this.base_url}/update_user/${id}`,{})
  }

  addProductApi(productData:any){
    return this.http.post(`${this.base_url}/add`,productData)
  }

  getProductApi(){
    return this.http.get(`${this.base_url}/get_products`)
  }

  editProductApi(id:any,updateData:any){
    return this.http.put(`${this.base_url}/edit_product/${id}`,updateData)
  }

  deleteProductApi(id:any){
    return this.http.delete(`${this.base_url}/delete_product/${id}`)
  }

  getAllOrdersApi(): Observable<OrdersResponse>{
    return this.http.get<OrdersResponse>(`${this.base_url}/get_orders`)
  }

  updateOrderStatusApi(id: string, status: string) {
    return this.http.put(`${this.base_url}/update_order/${id}`, { status });
  }
}
