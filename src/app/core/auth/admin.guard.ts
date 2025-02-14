import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RoutCheckService } from '../dashServices/rout-check.service';

export const adminGuard: CanActivateFn = (route, state) => {
  
  const authService=inject(RoutCheckService)
  const rout=inject(Router)

  if(authService.accessTo()){
    return true
  }
  else{
    alert('Please login')
    rout.navigateByUrl("/login")
    return false
  }

};
