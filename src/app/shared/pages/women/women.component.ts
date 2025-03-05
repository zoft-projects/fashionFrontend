import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit{
  allProducts:any=[]

  constructor(private us:UsersService){}

  ngOnInit(): void {
    this.getProducts('Women')
  }
  getProducts(category:any){
    this.us.getProductApi(category).subscribe((result:any)=>{
      this.allProducts=result.allProducts
      console.log(this.allProducts);
      
    })
  }


}
