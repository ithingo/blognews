import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NewsType } from '../news/news-type';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GetNewsListService {

  host: string = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient,
    private _userService: UserService,
   ) { }

  getNews(): Observable<NewsType[]> {
    const apiRoot = `${this.host}/api/v1/posts/`;
    const token = this._userService.getToken();

    console.log({'get-news': token});

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${token}`);

    return this.http
      .get<NewsType[]>(apiRoot, { headers: headers })
  }
}