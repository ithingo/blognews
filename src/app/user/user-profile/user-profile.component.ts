import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { GetNewsListService } from '../../_services/get-news-list.service';
import { UserType } from '../user-type';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service'
import { NewsType } from '../../news/news-type';

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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _getNewsListService: GetNewsListService,
    private _userService: UserService,
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    this.retrieveUser();
    this.retrieveUserPosts();
  }

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
      console.log(event);
      // this._userService.getUserById(this._userService.getCurrentUserId())
      //   .subscribe(
      //     user => {
      //       this.userNameFull = `${user.first_name} ${user.second_name}`;
      //       this.userPhoto = user.photo;
      //       this._userId = user.id;
      //     }
      //   )
      // this.retrieveUserPosts();
      this._router.navigate([`profile/${this._userId}`]);
    }
  }
}
