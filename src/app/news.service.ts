import { Injectable } from '@angular/core';

import { News } from './news/news';
import { NEWSARRAY } from './mock-news-lis';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  getNews(): News[] {
    return NEWSARRAY;
  }
}
