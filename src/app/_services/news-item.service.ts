import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { NewsType } from '../news/news-type';
import { NEWSARRAY } from '../mock-data';

@Injectable({
  providedIn: 'root'
})
export class NewsItemService {

  constructor() { }

  getNews(): Observable<NewsType[]> {
    return of(NEWSARRAY);   // real http -> HttpClient.get<NewsType[]>
  }
}
