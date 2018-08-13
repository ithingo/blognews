import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as SocialAuthService} from 'angularx-social-login';


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
    private _socialAuthService: SocialAuthService,
  ) { }

  ngOnInit() {
  }

  logOut() {
    this._socialAuthService.signOut();
    this._authService.logout();
  }

  isCurrnetUserLogged(): boolean {
    return this._userService.isLoggedIn();
  }

  goToUserProfile() {
      const id = this._userService.getCurrentUserId();
      this._appRoute.navigate(['home']);
  }
}
