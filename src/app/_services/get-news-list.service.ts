import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NewsType } from '../news/news-type';

@Injectable({
  providedIn: 'root'
})
export class GetNewsListService {

  host: string = 'http://127.0.0.1:8000';

  constructor(public http: HttpClient) { }

  getNews(): Observable<NewsType[]> {
    const apiRoot = `${this.host}/api/v1/posts/`;
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3RAdGVzdC5ydSIsImV4cCI6MTUzMzQ1MDk3NSwiZW1haWwiOiJ0ZXN0QHRlc3QucnUifQ.7D77tK72RjT7OWlwJWv9IOzeoHshwaXHfx7FwxT8utU';

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${token}`);

    return this.http
      .get<NewsType[]>(apiRoot, {headers: headers})
  }
}