import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { UserType } from '../user/user-type';
import { USERARRAY } from '../mock-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAllUsers(): Observable<UserType[]> {
    return of(USERARRAY);     // real http -> HttpClient.get<UserType[]>
  }

  getUserById(id: number): Observable<UserType> {
    return of(USERARRAY.find(user => user.id === id));
  }
}
