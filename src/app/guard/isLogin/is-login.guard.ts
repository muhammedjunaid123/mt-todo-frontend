import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { inject } from '@angular/core';
export const isLoginGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  if(localStorage.getItem(environment.userSecret)){
    return true;
  }else{
    router.navigate(['login'])
    return false
  }
};
