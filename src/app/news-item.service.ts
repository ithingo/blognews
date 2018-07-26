import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { News } from './news/news-item/news';
import { NEWSARRAY } from './mock-news-list';

@Injectable({
  providedIn: 'root'
})
export class NewsItemService {

  constructor() { }

  getNews(): Observable<News[]> {
    return of(NEWSARRAY);   // real http -> HttpClient.get<News[]>
  }
}
