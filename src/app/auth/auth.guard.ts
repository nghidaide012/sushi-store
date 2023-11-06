import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {inject} from '@angular/core'
import { from } from 'rxjs';

import { map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

export const authGuard: CanMatchFn = (route, state) => {

    const auth: AuthService = inject(AuthService);
    var loginStatus = false
    auth.loginStatus$.subscribe({next: (res) => loginStatus = res})
    if(loginStatus)
    {
      return true;
    }
    else
    {
      const router = inject(Router);
      router.navigate(['/']);
      return false;
    }
  
};


export const AdminGuard: CanMatchFn = (route, state) => {
  const auth: AuthService = inject(AuthService);

  return from(auth.getuserId()).pipe(
    switchMap((id) => {
      console.log(id)
      if (id) {
        return from(auth.getAdmin(id)).pipe(
          map((admin) => {console.log(admin); return !!admin})
        );
      } else {
        return of(false);
      }
    })
  );
};



