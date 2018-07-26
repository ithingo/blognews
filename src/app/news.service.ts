import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { News } from './news-module/news/news';
import { NEWSARRAY } from './mock-news-lis';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  getNews(): Observable<News[]> {
    return of(NEWSARRAY);   // real http -> HttpClient.get<News[]>
  }
}
