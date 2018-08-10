import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';


@Injectable({
  providedIn: 'root'
})
export class RetirieveResolverService implements Resolve<any>{

  constructor(
    private _userService: UserService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
    const id = route.params['id']
    return this._userService.getUserById(id);
  }
}
