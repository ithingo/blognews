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
    console.log({'get-token': token});
    return token;
  }

  setLoggedIn(token) {
    if(token) {
      this.cookieservice.set(this.coockieName, token);
    }

    console.log(document.cookie);
    console.log({'set-logged-in': token});

  }

  // setCurrentUserId(user_id: number) {
  //   this._currentUserId = user_id;
  // }

  getCurrentUserId(): number {
    return this._currentUser.id;
  }

  getUserById(user_id: number): Observable<UserType> {
    console.log({'1-id': this._currentUser.id});
    console.log({'2-id': user_id});


    const url = `${this.host}/api/v1/users/${user_id}/`;
    const token = this.getToken();

    console.log({'get-user-by-id': token});

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${token}`);

    return this.http
      .get<UserType>(url, { headers: headers });
  }

  setCurrentUser(user: UserType) {
    this._currentUser = user;
  }

  getCurrentUser(): UserType {
  // getCurrentUser(): Observable<any> {
    // const url = `${this.host}/api/v1/api-token-verify/`;
    // const url = `${this.host}/api/v1/api-token-auth/`;
    // const token = this.getToken();
    //
    // console.log({'get-current-user': token});
    //
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', `JWT ${token}`);
    //
    // return this.http
    //   .post<UserType>(
    //     url,
    //   {
    //     'token': token
    //   },
    //   { headers: headers }
    // );
    return this._currentUser;
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

    console.log({'update-user-data': token});

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



    // this.getUserById(user.id).subscribe(data => console.log(data))
  }
}
