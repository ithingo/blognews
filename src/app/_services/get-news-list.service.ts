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
  // host: string = 'http://127.0.0.1:8000';
  host: string = 'http://192.168.1.97:8000';
  optionToFilter: SelectionProperties;

  private checkBySelectedOption = (post: NewsType, keyWord: string, optionKey: string): any => {
    const postSubject = post.subject.toLowerCase();
    const postContent = post.content.toLowerCase();
    const postAuthorFirstName = post.author.first_name.toLowerCase();
    const postAuthorSecondName = post.author.second_name.toLowerCase();
    const keyWordLowercased = keyWord.toLowerCase();
    let postTags = '';
    if(post.tags) {
      postTags = post.tags.toLowerCase();
    }
    const filters = {
      'all': () => {
        if (postSubject.includes(keyWordLowercased) || postContent.includes(keyWordLowercased)
          || postAuthorFirstName.includes(keyWordLowercased) || postAuthorSecondName.includes(keyWordLowercased)
          || (postTags && postTags.includes(keyWordLowercased)))
        {
          return post;
        }
      },
      'subject': () => {
        if (postSubject.includes(keyWordLowercased)) {
          return post;
        }
      },
      'content': () => {
        if (postContent.includes(keyWordLowercased)) {
          return post;
        }
      },
      'author': () => {
        if (postAuthorFirstName.includes(keyWordLowercased) || postAuthorSecondName.includes(keyWordLowercased)) {
          return post;
        }
      },
      'tags':  () => {
        if (postTags && postTags.includes(keyWordLowercased)) {
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

        if(!this.optionToFilter) {
          this.optionToFilter = {
            key: 'all',
            value: 'Entire posts',
          }
        }

        data = data.filter(post => {
          const result = this.checkBySelectedOption(post, keyWord, this.optionToFilter.key);
          return result;
        });

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
