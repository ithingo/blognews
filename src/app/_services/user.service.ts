import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { UserType } from '../models/user-type';
import {NewsType} from '../models/news-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  host = 'http://127.0.0.1:8000';
  coockieName  = 'curr_user_token';

  private _currentUser: UserType;
  private _currentUserId: number;

  constructor(
    public http: HttpClient,
    private cookieservice: CookieService,
  ) { }

  getToken(): string|void {
    const token = this.cookieservice.get(this.coockieName);
    return token;
  }

  setLoggedIn(token) {
    if(token) {
      this.cookieservice.set(this.coockieName, token);
    }

  }

  getCurrentUserId(): number {
    const current_id = this.cookieservice.get('id');
    this._currentUserId = +(current_id);

    return this._currentUserId;
  }

  getUserById(user_id: number): Observable<UserType> {
    const url = `${this.host}/api/v1/users/${user_id}/`;
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
      this.cookieservice.set('id', current_user_id);
    }
    this._currentUserId = +(current_user_id);
  }

  getCurrentUser(): Observable<UserType> {
    return this.getUserById(this.getCurrentUserId());
  }

  isLoggedIn(): boolean {
    const cookieExists: boolean = this.cookieservice.check(this.coockieName);
    return cookieExists;
  }

  clearCookies() {
    this.cookieservice.deleteAll();
  }

  updateUserData(user: UserType, updatedData: any) {

    const url = `${this.host}/api/v1/users/${user.id}/`;
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
      ).subscribe(data => console.log(data));
  }
}
