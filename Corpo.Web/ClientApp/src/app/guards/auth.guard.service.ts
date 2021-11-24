import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let access = route.data.name;
    console.log(access);
    let allowedAccesses = this.accountService.getAccess();
    if (this.accountService.getLoggedUser() && allowedAccesses.find(x => x == access)) {
      return true;
    } if (this.accountService.getLoggedUser() && !allowedAccesses.find(x => x == access)) {
        this.router.navigate(['/login']);
        return false;
    } else {
      this.router.navigate(['/login']);
      console.log(state.url);
      return false;
    }
  }
}
