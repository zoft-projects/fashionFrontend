import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Modal } from 'bootstrap';
import { ToastService } from 'src/app/shared/services/toast.service';
import { RoutCheckService } from 'src/app/core/dashServices/rout-check.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {

  image: any = null;

  constructor(private fb:FormBuilder,private as:AdminService,private toast:ToastService,public routCheckService: RoutCheckService){}

  productForm=this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
    rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    price: [0, [Validators.required, Validators.min(0)]],
  })

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1];
        this.image = {
          fname: file.name,
          type: file.type,
          data: base64String, 
        };
      };
      reader.readAsDataURL(file);
    }
  }

addProduct(){
  if(this.productForm.valid  && this.image){
    const productData = {
      ...this.productForm.value,
      image: this.image,
    };

    this.as.addProductApi(productData).subscribe({
      next:(result:any)=>{
        console.log(result);
        this.toast.showSuccess('New product added')
        this.productForm.reset()
        this.image = null;
        const fileInput: any = document.querySelector('#image');
        if (fileInput) {
          fileInput.value = '';
        }
      },
      error:(error:any)=>{
        console.log('error=',error);  
      }
    })
  }
}

}
