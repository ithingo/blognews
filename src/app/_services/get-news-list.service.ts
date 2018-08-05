import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NewsType } from '../news/news-type';

@Injectable({
  providedIn: 'root'
})
export class GetNewsListService {

  // host: string = 'http://127.0.0.1:8000';

  constructor(public http: HttpClient) { }

  getNews(): Observable<NewsType[]> {
    // const apiRoot = `${this.host}/api/v1/posts.json`;

    // test json-server
    const apiRoot: string = 'http://localhost:3000/news';

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', `JWT ${-GET_USER_TOKEN_}`);

    return this.http
      .get<NewsType[]>(apiRoot, {headers: headers})
  }
}