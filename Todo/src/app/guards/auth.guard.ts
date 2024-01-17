import type { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {


  let isLogged = false;
  if(sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !==  undefined){
    isLogged = true;
  }
  return isLogged

};
