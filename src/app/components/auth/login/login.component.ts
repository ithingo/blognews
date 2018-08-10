import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService as SocialAuthService, SocialUser, FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';

import { UserType } from '../../../models/user-type';
import { AuthService } from '../../../_services/auth.service';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  private user: SocialUser;
  public authorized: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private _loginComponentRoute: Router,
    private _socialAuthService: SocialAuthService,
  ) {
    this.loginForm = this._formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ]
      ],
      password: [
        '',
        Validators.required,
      ]
    });
  }

   public socialSignIn(socialPlatform : string) {  

    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this._socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        // console.log(socialPlatform+" sign in data : " , userData);
        if (userData != null) {
           this.authorized = true;
           this.user = userData;   

           const user: any = {
              'email': userData.email,
              'password': userData.id,
              'first_name': userData.firstName,
              'second_name': userData.lastName,
              'photo': userData.photoUrl,
            } 

           this._authService.socialLogin(user)
            .subscribe(data => {
              const token = data['token'];
              this._userService.setLoggedIn(token);
              this._userService.setCurrentUser(data['user']);

              console.log(data['user']);

              this._loginComponentRoute.navigate(["/"]);
            });        
        }       
      }
    );
  }

  signOut(): void {
    this._socialAuthService.signOut();
    this.authorized = false;
  }

  ngOnInit() {
  }

  get form() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const user: any = {
        'email': this.loginForm.value['email'],
        'password': this.loginForm.value['password'],
      }

      this._authService.login(user)
        .subscribe(data => {
          const token = data['token'];
          this._userService.setLoggedIn(token);
          this._userService.setCurrentUser(data['user']);

          console.log(data);

          this._loginComponentRoute.navigate(["/"]);
        });
    } else {
      return;
    }
  }
}
