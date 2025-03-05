import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { RoutCheckService } from 'src/app/core/dashServices/rout-check.service';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{

  allProducts:any=[]
  selectedProduct: any = {};
  p: number=1;
  private editModal: Modal | null = null;
  imagePreview: string | null = null;
  selectedImageFile: File | null = null;
  searchData:any=""

  constructor(private as:AdminService,private router:Router,public routCheckService: RoutCheckService,private toast:ToastService){}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.as.getProductApi().subscribe((result:any)=>{
      this.allProducts=result.allProducts
      console.log(this.allProducts);
      
    })
  }

  
  updateModal(product: any) {
    this.selectedProduct = { ...product }; 
    this.imagePreview = product.image
    ? 'data:' + product.image.type + ';base64,' + product.image.data
    : null; 
  this.selectedImageFile = null;
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      this.editModal = new Modal(modalElement); 
      this.editModal.show();
    }
  }
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1];
        this.selectedProduct.image = {
          fname: file.name,
          type: file.type,
          data: base64String, 
        };
        this.imagePreview = reader.result ? reader.result.toString() : null;
        };
      reader.readAsDataURL(file);
    }
  }
  updateProduct(){
    this.as.editProductApi(this.selectedProduct._id, this.selectedProduct).subscribe(
      (response: any) => {
        console.log('Product updated successfully:', response);
        this.toast.showSuccess('Product updated successfully')
        this.getProducts(); 
        if (this.editModal) {
          this.editModal.hide();  
        }
      },
      (error: any) => {
        console.error('Error updating product:', error);
      }
    );
  }

  deleteProduct(id:any){
    this.as.deleteProductApi(id).subscribe((result:any)=>{
      this.toast.showSuccess('Product deleted')
      this.getProducts()
    })
  }

  logout(){
    console.log("Logout called");
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.router.navigateByUrl("/")
  }
}
