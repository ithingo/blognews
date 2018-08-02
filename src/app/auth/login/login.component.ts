import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../_services/auth.service';

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
      this._authService.sendToken(this.loginForm.value.email);  // temp save email as a token instead of token retrieved from server
      this._loginComponentRoute.navigate(["/"]);
    } else {
      return;
    }
  }
}
