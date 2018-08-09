import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserService } from './user.service';
import { NewsType }  from '../models/news-type';
import { UserType }  from '../models/user-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeNewsService implements OnInit {
  private data: any[] = [];
  private currentUserId: any;

  host = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient,
    private _userService: UserService,
  ) {}

  ngOnInit() {
    this.currentUserId = this._userService.getCurrentUserId();
  }

  public save(data: any, isNew?: boolean) {
    const token = this._userService.getToken();

    console.log({'edit-service-save': token});

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `JWT ${token}`);

    console.log(data);

    let url = '';
    let response$: Observable<NewsType>;

    if(isNew) {
      url = `${this.host}/api/v1/posts/`;
      response$ = this.http
        .post<any>(
          url,
          {
            'subject': data.subject,
            'content': data.subject,
            // 'tags': data.tags,
            'user_id': this.currentUserId,
          },
          { headers: headers }
        );
    } else {
      const post_id = data.id;
      console.log({'id': post_id});
      url = `${this.host}/api/v1/posts/${post_id}/`;
      response$ = this.http
        .patch<any>(
          url,
          {
            'id': post_id,
            'subject': data.subject,
            'content': data.content,
            // 'tags': data.tags,
            'user_id': this.currentUserId,
          },
          { headers: headers }
        );
    }

    response$
      .subscribe(
        (data) => {console.log(data);},  //?
        (err) => {console.log(err);}     //?
      );
  }

  public remove(data: any) {
    const post_id = data.id;
    const url = `${this.host}/api/v1/posts/${post_id}/`;
    const token = this._userService.getToken();

    console.log({'edit-service-remove': token});

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
