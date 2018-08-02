import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NewsType } from '../news/news-type';
import { NEWSARRAY } from '../mock-data';

@Injectable({
  providedIn: 'root'
})
export class NewsItemService {

  constructor(public http: HttpClient) { }

  getNews(): Observable<NewsType[]> {
    return of(NEWSARRAY);   // real http -> HttpClient.get<NewsType[]>
  }

  // ping(url) {
  //   const headers = new HttpHeaders();
  //   headers.append('Access-Control-Allow-Headers', 'Content-Type');
  //   headers.append('Access-Control-Allow-Methods', 'GET');
  //   headers.append('Access-Control-Allow-Origin', '*');
  //
  //   this.http
  //     .get(url, {headers: headers})
  //     .subscribe(
  //       data => console.log(data),
  //       err => console.log(err)
  //     );
  // }
}
