import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = null;
  orders: any[] = [];
  image: any = null;

  constructor(private us:UsersService,private toast:ToastService){}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); 
      this.getUser(user.uid);
      const userData = localStorage.getItem('user'); 
      if (userData) {
        const user = JSON.parse(userData);
        if (user._id) {
          this.getOrders(user._id);
        }   
      }     
    }
  

    getUser(id: string): void {
      this.us.getUserApi(id).subscribe({
        next: (response: any) => {
          this.user = response?.userById || null;
          if (this.user?.image?.data) {
            this.user.image.data = this.arrayBufferToBase64(
              this.user.image.data.data
            );
          }
          console.log('User:', this.user);
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        },
      });
    }
  
    triggerFileInput(): void {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      if (fileInput) {
        fileInput.click();
      }
    }
  
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
  
    arrayBufferToBase64(buffer: number[]): string {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    }
  
    updateProfileImage(): void {
      if (!this.image) {
        this.toast.showWarning('Please select an image first')
        return;
      }
  
      const profileData = {
        base64Image: this.image.data,
        fileName: this.image.fname,
        fileType: this.image.type,
      };
  
      this.us.updateProfileApi(this.user._id, profileData).subscribe({
        next: (res: any) => {
          this.user.image = this.image; 
          this.toast.showSuccess(`Profile picture updated!`)
        },
        error: (err) => {
          this.toast.showError('Profile updation failed!')
          console.error(err);
        },
      });
    }

    getOrders(id:string){
      this.us.getUserOrderApi(id).subscribe({
        next: (response: any) => {
          console.log('api response=',response);
          
          this.orders = response?.orderById || [];
          console.log(this.orders);   
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    }
}
