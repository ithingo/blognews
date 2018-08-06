import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': `JWT ${this.token}`, !!!!!!!!!!!!!!!!
    'X-CSRFToken': this.cookieservice.get('csrftoken')
  });

  constructor(
    private _authRoute: Router,
    private http: HttpClient,
    private cookieservice: CookieService,
  ) { }

  login(user): Observable<any> {
    const url = 'http://127.0.0.1:8000/api/v1/api-login-user';

    console.log(document.cookie['csrftoken']);

    return this.http.post(
      url,
      user,
      { headers: this.headers }
    );
  }

  // logout(user): 

  register(user): Observable<any> {
    const url = 'http://127.0.0.1:8000/api/v1/api-register-user';
    
    return this.http.post(
      url,
      user,
      { headers: this.headers },
    );
  }
}
