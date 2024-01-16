import type { CanActivateFn } from '@angular/router';
import { Session } from 'inspector';

export const authGuard: CanActivateFn = (route, state) => {

  let isLogged = false;
  if(sessionStorage.getItem('token') !== null || undefined){
    isLogged = true;
    return isLogged
  }
  return isLogged

};
