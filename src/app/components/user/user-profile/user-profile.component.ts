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
  editForm: FormGroup;
  submitted = false;
  isEdit: boolean = false;
  selectedPostId: number;

  postSubject: string;
  postContent: string;

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
    this.retrieveUser();
    this.retrieveUserPosts();
  }

  get form() {
    return this.editForm.controls;
  }

  ngOnChanges(changes: any) {  }

  retrieveUser() {
    let user$ = this._route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._userService.getUserById(
          +(params.get('id')) // get id value as int
        )
      )
    );

    // if the user is current user
    // if(!user$) {
    //   user$ = this._userService.getUserById(this._userService.getCurrentUserId())
    // }

    user$
      .subscribe(
        user => {
          this.userNameFull = `${user.first_name} ${user.second_name}`;
          this.userPhoto = user.photo;
          this._userId = user.id;
        }
      );
  }

  retrieveUserPosts() {
    this._getNewsListService.getNews()
      .subscribe(newsArray => this.userPosts = newsArray);
  }
  
  gotoNewsList() {
    this._router.navigate(['feeds']);
  }

  isCurrnetUserLogged(): boolean {
    return this._userService.isLoggedIn();
  }

  logOut() {
    this._authService.logout();
  }

  handleUserChanged(event) {
    if(event) {
      location.reload();
    }
  }

  editPost(index: number, post: NewsType) {
    this.selectedItem = post;

    this.selectedPostId = index;

    this.postSubject = this.selectedItem.subject;
    this.postContent = this.selectedItem.content;

    this.initForm();

    this.isEdit = true;
  }

  deletePost(post: NewsType) {
    const data = {
      id: post.id,
    }
    this._changeNewsService.remove(data);

    location.reload();
  }

  savePost() {
    this.submitted = true;

    if(this.editForm.valid){
      const data = {
        id: this.selectedItem.id,
        subject: this.postSubject,
        content: this.postContent,
      }
      this._changeNewsService.save(data, false);  //second param is to determine - create new or update

      this.isEdit = false;

      location.reload();
    }
  }

  private initForm() {
    this.editForm = this._formBuilder.group(
      {
        subject: [
          '',
          Validators.required,
        ],
        content: [
          '',
          Validators.required,
        ],
        // tags: [
        //   '',
        //   Validators.required,
        // ],
      },
    );
  }
}