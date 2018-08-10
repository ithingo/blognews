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
    // this.retrieveAllData()
    //   .then(res => {
    //     console.log(res);
    //     return this.retrieveUser().toPromise();
    //   })
    //   .then(res =>{
    //     this.retrieveAllData();
    //   }, err => console.log(err))
    this.retrieveUser();
    this.retrieveUserPosts(this._userId);
  }

  ngOnChanges(changes: any) {
    // this.retrieveUserPosts(this._userId);
  }

  retrieveAllData(): Promise<any> {
    return Promise.resolve(1);
  }

  retrieveUser() {
    let user$ = this._route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._userService.getUserById(
          +(params.get('id')) // get id value as int
        )
      )
    );

    let userId: any;

    user$
      .subscribe(
        user => {
          this.userNameFull = `${user.first_name} ${user.second_name}`;
          this.userPhoto = user.photo;
          this._userId = user.id;

          // userId = th

          // console.log(user.posts);

          console.log({"user$": this._userId});
        }
      );



    console.log({'retr': userId});

    return user$;

    // this.retrieveUserPosts(this._userId);
  }

  retrieveUserPosts(id: any) {
    // if(id) {
      this._getNewsListService.getUserNews(id)
        .subscribe(newsArray => {this.userPosts = newsArray; console.log(newsArray)});
    // }

    console.log(this.userPosts);
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
