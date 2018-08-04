import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) {}

  canActivate(
  	next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isLoggednIn()) {
      return true;
    } else {
      this._router.navigate(
      	['login'],
      	{queryParams: {returnUrl: state.url}}
			);
      return false;
    }
  }
}
