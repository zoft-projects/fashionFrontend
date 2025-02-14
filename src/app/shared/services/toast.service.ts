import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast:ToastrService) { }

  showSuccess(msg:any){
    this.toast.success('Success',msg)
  }

  showError(msg:any){
    this.toast.error('Error',msg)
  }

  showWarning(msg:any){
    this.toast.warning('Warning',msg)
  }
}
