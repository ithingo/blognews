import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlwaysAuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Hello from the AlwaysAuthGuard!!');
    return true;
  }
}
