import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit{

  allProducts:any=[]

  constructor(private us:UsersService){}

  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){
    this.us.getProductApi().subscribe((result:any)=>{
      this.allProducts=result.allProducts
      console.log(this.allProducts);
      
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
  

}
