import { ActivatedRoute, CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import { from, map, of, switchMap } from 'rxjs';
import { CusStoreService } from './cus-store.service';

export const permissionGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const store: CusStoreService = inject(CusStoreService);

  const orderId = route.paramMap.get('id')
  console.log(orderId)
  return from(auth.getuserId()).pipe(
    switchMap((id) => {
      if(id) {
        return from(store.getOrder(orderId!)).pipe(
          map((item) => {
            if(item && item.customerId === id)
            {
              return true;
            }
            else
            {
              return false;
            }
          })
        )
      }
      else
      {
        return of(false);
      }
    })
  )
};

export const authGuard: CanActivateFn = (route, state) => {

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
