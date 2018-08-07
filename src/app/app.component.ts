import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private _userService: UserService,
    private _appRoute: Router,
  ) {}

  goToUserProfile() {
    const userId = this._userService.getCurrentUserId();

    if(userId) {
      this._appRoute.navigate([`profile/${userId}`]);
    } else {
      this._appRoute.navigate(['/']);
    }
  }

}
