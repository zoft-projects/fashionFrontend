import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  base_url="http://localhost:8000/api/users"

  constructor(private http:HttpClient) { }

  registerApi(bodyData:any){
    return this.http.post(`${this.base_url}/register`,bodyData)
  }

  loginApi(bodyData:any){
    return this.http.post(`${this.base_url}/login`,bodyData)
  }

  getUserApi(id:any){
    return this.http.get(`${this.base_url}/get_user_by_id/${id}`)
  }

  getProductApi(category: any = ''){
    return this.http.get(`${this.base_url}/get_products?category=${category}`)
  }

  getSingleProductApi(id:any){
    return this.http.get(`${this.base_url}/get_products/${id}`)
  }

  createOrderApi(orderData:any){
    return this.http.post(`${this.base_url}/add_order`,orderData)
  }

  getUserOrderApi(id:any){
    return this.http.get(`${this.base_url}/get_order_by_id/${id}`)
  }

  updateProfileApi(id:any,profileData:any){
    return this.http.put(`${this.base_url}/update_profile/${id}`,profileData)
  }
}
