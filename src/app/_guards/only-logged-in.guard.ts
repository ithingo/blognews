import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _userService: UserService,
  ) {}

  canActivate(
  	next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._userService.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(
      	['login'],
      	{queryParams: {returnUrl: state.url}}
			);
      return false;
    }
    // return true;
  }
}
