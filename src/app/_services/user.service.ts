import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserType } from '../models/user-type';
import {NewsType} from '../models/news-type';

import { MY_HOST } from '../../../host-config';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // host = 'http://127.0.0.1:8000';
  // host = 'http://192.168.1.97:8000';

  host = MY_HOST

  coockieName  = 'curr_user_token';

  private _currentUser: UserType;
  private _currentUserId: number;

  constructor(
    public http: HttpClient,
  ) { }

  getToken(): string|void {
    const token = localStorage.getItem(this.coockieName);
    return token;
  }

  setLoggedIn(token) {
    if(token) {
      localStorage.setItem(this.coockieName, token);
    }

  }

  getCurrentUserId(): number {
    const current_id = localStorage.getItem('id');
    this._currentUserId = +(current_id);

    return this._currentUserId;
  }

  getUserById(user_id: number): Observable<UserType> {
    const url = `${this.host}/users/${user_id}/`;
    const token = this.getToken();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${token}`);

    return this.http
      .get<UserType>(url, { headers: headers });
  }

  setCurrentUser(user: any) {
    const current_user_id = user['id'];
    if(current_user_id) {
      localStorage.setItem('id', current_user_id);
    }
    this._currentUserId = +(current_user_id);
  }

  getCurrentUser(): Observable<UserType> {
    return this.getUserById(this.getCurrentUserId());
  }

  isLoggedIn(): boolean {
    const cookieExists = localStorage.getItem(this.coockieName);
    if(cookieExists) {
      return true;
    } else {
      return false;
    }
  }

  clearCookies() {
    localStorage.clear();
  }

  updateUserData(user: UserType, updatedData: any) {

    const url = `${this.host}/users/${user.id}/`;
    const token = this.getToken();

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${token}`);

    this.http
      .patch(
        url,
        {
          'email': updatedData.email,
          'first_name': updatedData.first_name,
          'second_name': updatedData.second_name,
          'photo': updatedData.photo,
        },
        { headers: headers }
      ).subscribe(data => console.log(data['status']));
  }
}
