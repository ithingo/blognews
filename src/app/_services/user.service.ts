import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { UserType } from '../user/user-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  host = 'http://127.0.0.1:8000';
  coockieName  = 'curr_user_token';

  constructor(
    public http: HttpClient,
    private cookieservice: CookieService,
  ) { }

  getToken(): string|void {
    // if(this.isLoggedIn()) {
      const token = this.cookieservice.get(this.coockieName);

      console.log({'get-token': token});

      return token;
    // }
  }

  setLoggedIn(token) {
    if(token) {
      this.cookieservice.set(this.coockieName, token);
    }

    console.log(document.cookie);
    console.log({'set-logged-in': token});

  }

  getUserById(user_id: number): Observable<UserType> {
    const url = `${this.host}/api/v1/users/${user_id}`;
    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3RAdGVzdC5ydSIsImV4cCI6MTUzMzQ1MDk3NSwiZW1haWwiOiJ0ZXN0QHRlc3QucnUifQ.7D77tK72RjT7OWlwJWv9IOzeoHshwaXHfx7FwxT8utU';
    const token = this.getToken();

    console.log({'get-user-by-id': token});

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${token}`);

    return this.http
      .get<UserType>(url, { headers: headers })
  }

  getCurrentUser(): Observable<UserType> {
    const url = `${this.host}/api/v1/`; // ??????????????????????????????????????????????????????????????????????
    const token = this.getToken();

    console.log({'get-current-user': token});

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${token}`);

    return this.http
      .get<UserType>(url, { headers: headers })
  }

  isLoggedIn(): boolean {
    const cookieExists: boolean = this.cookieservice.check(this.coockieName);
    return cookieExists;
  }
}
