import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { NewsItemService } from '../../_services/news-item.service';
import { UserType } from '../user-type';
import { UserService } from '../../_services/user.service';
import { Observable } from 'rxjs';
import { NewsType } from '../../news/news-type';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private _user: UserType;
  private _activeUser : UserType;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _newsService: NewsItemService,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this.retrieveUser();

    // temp -> active user is Hillary
    // this._activeUser.id = 1;
  }

  retrieveUser() {
    const userObservable = this._route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._userService.getUserById(
          +(params.get('id')) // get id value as int
        )
      )
    );
    userObservable.subscribe(user => this._user = user);
  }

  getUserName(): string {
    return this._user.fullName;
  }

  getUserPhoto(): string {
    return this._user.photo;
  }

  getUserPosts(): NewsType[]|null {
    let result: NewsType[] = [];
    this._newsService.getNews()
      .subscribe(newsArray => result = newsArray);

    if (result.length) {
      return result.filter(news => news.userId == this._user.id)
    }
    return null;
  }

  gotoNewsList() {
    this._router.navigate(['feeds']);
  }

  getActiveUserId(): number {
    return this._activeUser.id;
  }
}
