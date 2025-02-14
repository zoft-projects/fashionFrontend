import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder,private router:Router,private userService:UsersService,private toast:ToastService){}

  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.pattern('^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')]],
    password:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9 ]+$')]]
   
  })

  login() {
    if (this.loginForm.valid) {
      const bodyData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
  
      this.userService.loginApi(bodyData).subscribe({
        next: (result: any) => {
          if (result.status === 200) {
            
            localStorage.setItem("token", result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            this.toast.showSuccess('Login success');
            this.router.navigateByUrl("/");
          } 
          else {
            this.toast.showError('Invalid credentials');
          }
        },
        error: (err: any) => {
          this.toast.showError('Failed to login');
          console.error(err);
        },
      });
    } else {
      alert('Invalid form');
    }
  }
  

}
