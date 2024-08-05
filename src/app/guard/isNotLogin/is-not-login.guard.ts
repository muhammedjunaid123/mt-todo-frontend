import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { inject } from '@angular/core';
export const isNotLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if (localStorage.getItem(environment.userSecret)) {
    router.navigate(['home'])
    return false
  } else {
    return true;
  }
};

