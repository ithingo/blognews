import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserType } from '../../user/user-type';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private _loginComponentRoute: Router,
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

          console.log({'login-component': {'data': data, 'token': token}});

          console.log(data);
          console.log(token);

          // this._userService.setLoggedIn(token);
        });
        // .subscribe(data => console.log(data));

      // this._loginComponentRoute.navigate(["/"]);
    // } else {
    //   return;
    }
  }
}
