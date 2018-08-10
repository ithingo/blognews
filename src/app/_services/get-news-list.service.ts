import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NewsType } from '../models/news-type';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GetNewsListService {

  host: string = 'http://192.168.1.97:8000';

  constructor(
    private http: HttpClient,
    private _userService: UserService,
   ) { }

  getNews(): Observable<NewsType[]> {
    const apiRoot = `${this.host}/api/v1/posts/`;
    const token = this._userService.getToken();

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${token}`);

    return this.http
      .get<NewsType[]>(apiRoot, { headers: headers })
  }

  getUserNews(id: any): Observable<any[]> {
    // if(id) {
      const apiRoot = `${this.host}/api/v1/users/${id}/posts/`;
      const token = this._userService.getToken();


      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `JWT ${token}`);

      return this.http
        .get<NewsType[]>(apiRoot, { headers: headers })
    }
  // }
}
