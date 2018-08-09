import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
  	private _authService: AuthService,
  	private _userService: UserService,
  	private _appRoute: Router,
  ) { }

  ngOnInit() {
  }

  logOut() {
    this._authService.logout();
  }

  isCurrnetUserLogged(): boolean {
    return this._userService.isLoggedIn();
  }

  goToUserProfile() {
    const userId = this._userService.getCurrentUserId();

    if(userId) {
      this._appRoute.navigate([`profile/${userId}`]);
    } else {
      this._appRoute.navigate(['/']);
    }
  }
}
