import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder,private userService:UsersService,private router:Router,private toast:ToastService){}

  signUpform=this.fb.group({
    username:['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
    email:['',[Validators.required,Validators.pattern('^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')]],
    password:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9 ]+$')]]

  })

  register(){
    if(this.signUpform.valid){
      var path=this.signUpform.value
      var bodyData={
        username:path.username,email:path.email,password:path.password
      }
      this.userService.registerApi(bodyData).subscribe({
        next:(result:any)=>{
          this.toast.showSuccess(`${result.newUser.username} registered successfully`)
          console.log(result);
          this.signUpform.reset()
          this.router.navigateByUrl('/login')
        },
        error:(result:any)=>{
          alert(result.error)
        }
      })
    }
    else{
      alert('Invalid form')
    }
  }
}
