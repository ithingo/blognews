import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserService } from './user.service';
import { NewsType }  from '../models/news-type';
import { UserType }  from '../models/user-type';
import { Observable } from 'rxjs';

import { MY_HOST } from '../../../host-config';

@Injectable({
  providedIn: 'root'
})
export class ChangeNewsService implements OnInit {
  private data: any[] = [];
  public tags: any[] = [];
  private currentUserId: any;

  // host = 'http://127.0.0.1:8000';
  // host = 'http://192.168.1.97:8000';

  host = MY_HOST

  constructor(
    private http: HttpClient,
    private _userService: UserService,
  ) {}

  ngOnInit() {
  }

  public save(data: any, isNew?: boolean) {
    this.currentUserId = this._userService.getCurrentUserId();
    const token = this._userService.getToken();

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${token}`);

    let url = '';
    let response$: Observable<NewsType>;

    if(isNew) {
      url = `${this.host}/posts/`;
      response$ = this.http
        .post<any>(
          url,
          {
            'subject': data.subject,
            'content': data.subject,
            'photo': data.photo,
            'tags': data.tags,
            'user_id': this.currentUserId,
          },
          { headers: headers }
        );
    } else {
      const post_id = data.id;
      url = `${this.host}/posts/${post_id}/`;
      response$ = this.http
        .patch<any>(
          url,
          {
            'id': post_id,
            'subject': data.subject,
            'content': data.content,
            'photo': data.photo,
            'tags': data.tags,
            'user_id': this.currentUserId,
          },
          { headers: headers }
        );
    }

    response$
      .subscribe(
        (data) => {console.log(data['status']);},
        (err) => {console.log(err);}
      );
  }

  public remove(data: any) {this.currentUserId = this._userService.getCurrentUserId()

    const post_id = data.id;
    const url = `${this.host}/posts/${post_id}/`;
    const token = this._userService.getToken();

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${token}`);

    return this.http
      .delete<any>(
        url,
        { headers: headers }
      )
      .subscribe(resp => {
        this.data = resp;
      });
  }
}
