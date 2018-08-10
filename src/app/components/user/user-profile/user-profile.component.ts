import { Component, OnInit, OnChanges } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { GetNewsListService } from '../../../_services/get-news-list.service';
import { UserType } from '../../../models/user-type';
import { UserService } from '../../../_services/user.service';
import { AuthService } from '../../../_services/auth.service';
import { NewsType } from '../../../models/news-type';
import { ChangeNewsService } from '../../../_services/change-news.service';
import {resolve} from 'q';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userNameFull: string;
  userPosts: any[];
  userPhoto: string;
  private _userId: any;

  selectedItem: NewsType;

  addForm: FormGroup;
  editForm: FormGroup;

  editSubmitted = false;
  addSubmitted = false;

  isEdit: boolean = false;
  selectedPostId: number;

  postSubject: string;
  postContent: string;
  postPhoto: string;
  postTags: string;

  addedPostPhoto: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _getNewsListService: GetNewsListService,
    private _userService: UserService,
    private _authService: AuthService,
    private _changeNewsService: ChangeNewsService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    let id = this._route.snapshot.paramMap.get('id');

    if (+(id) == this._userService.getCurrentUserId()) {
      this._router.navigate(['home']);
    }

    this.retrieveAllData(id);
  }

  retrieveAllData(id) {
    this.retrieveUser();
    this.retrieveUserPosts(id);
  }

  retrieveUser() {
    let user$ = this._route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._userService.getUserById(
          +(params.get('id')) // get id value as int
        )
      )
    );

    user$
      .subscribe(
        user => {
          this.userNameFull = `${user.first_name} ${user.second_name}`;
          this.userPhoto = user.photo;
          this._userId = user.id;
        }
      );
    return user$;
  }

  retrieveUserPosts(id: any) {
    // if(id) {
      this._getNewsListService.getUserNews(id)
        .subscribe(newsArray => {this.userPosts = newsArray});
    // }

  }


  
  gotoNewsList() {
    this._router.navigate(['feeds']);
  }

  isCurrnetUserLogged(): boolean {
    return this._userService.isLoggedIn();
  }

  getTags(): string[] {
    return this._changeNewsService.tags;
  }
}
