import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise'; //?
import 'rxjs/add/operator/delay';
import 'rxjs/Rx';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { NewsType } from '../models/news-type';
import { SelectionProperties } from '../components/news/search-selection/selection-properties';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GetNewsListService {

  host: string = 'http://127.0.0.1:8000';
  optionToFilter: SelectionProperties;

  private checkBySelectedOption = (post: NewsType, keyWord: string, optionKey: string): any => {


    console.log({post: post, keyWord: keyWord, optionKey:optionKey});


    const filters = {
      'all': () => {
        if (post.subject.includes(keyWord) || post.content.includes(keyWord) 
          || post.author.first_name.includes(keyWord) || post.author.second_name.includes(keyWord) 
          || (post.tags && post.tags.includes(keyWord)))
        {
          console.log({post: post});

          return post;
        }
      },
      'subject': () => {
        if (post.subject.includes(keyWord)) {

          console.log({post: post});

          return post;
        }
      },
      'content': () => {
        if (post.content.includes(keyWord)) {

          console.log({post: post});

          return post;
        }
      },
      'author': () => {
        if (post.author.first_name.includes(keyWord) || post.author.second_name.includes(keyWord)) {

          console.log({post: post});

          return post;
        }
      },
      'tags':  () => {
        if (post.tags && post.tags.includes(keyWord)) {

          console.log({post: post});

          return post;
        }
      },
    };

    return filters[optionKey]();
  };

  constructor(
    private http: HttpClient,
    private _userService: UserService,
  ) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    let noResults: Array<any> = [];
    return Promise.resolve(noResults);
  }

  private extractData(res: any) {
    return res;
  }

  search(terms: Observable<string> ) {
    return terms
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .pipe(switchMap(
        term => this.rawSearch(term)
      ));
  }

  rawSearch(terms: string) {
    const news$ = this.getNews();

    return news$.toPromise()
      .then(this.extractData)
      .then(data => {
        const keyWord = terms.trim();

        console.log(this.optionToFilter);

        if(!this.optionToFilter) {
          this.optionToFilter = {
            key: 'all',
            value: 'Entire posts',
          }
        }

        console.log(this.optionToFilter);

        data = data.filter(post => {
          console.log({hades: post});

          return this.checkBySelectedOption(post, keyWord, this.optionToFilter.key);
        });

        console.log(data);

        return data;
      })
      .catch(this.handleError);
  }

  getNews() {
    const apiRoot = `${this.host}/api/v1/posts/`;
    const token = this._userService.getToken();

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${token}`);

    return this.http
      .get<NewsType[]>(apiRoot, { headers: headers })
  }

  getUserNews(id: any): Observable<any[]> {
      const apiRoot = `${this.host}/api/v1/users/${id}/posts/`;
      const token = this._userService.getToken();

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `JWT ${token}`);

      return this.http
        .get<NewsType[]>(apiRoot, { headers: headers })
  }
}
