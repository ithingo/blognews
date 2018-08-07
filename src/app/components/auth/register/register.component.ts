import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../_services/auth.service';

import { ConfirmPasswordValidationDirective } from '../confirm-password-validation.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _registerComponentRoute: Router,
  ) {
    this.registerForm = this._formBuilder.group(
      {
        first_name: [
          '',
          Validators.required,
        ],
        second_name: [
          '',
          Validators.required,
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
          ]
        ],
        photo: [
          '',
          Validators.required,
        ],
        password: [
          '',
          Validators.required,
        ],
        password_confirmation: [
          '',
          Validators.required,
        ]
      },
    );
  }

  ngOnInit() {
  }

  get form() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;

    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      const user: any = {
        'email': this.registerForm.value['email'],
        'password': this.registerForm.value['password'],
        'first_name': this.registerForm.value['first_name'],
        'second_name': this.registerForm.value['second_name'],
        'photo': this.registerForm.value['photo'],
      }

      // user.email = this.loginForm.value['email'];
      // user.password = this.loginForm.value['password'];

      this._authService.register(user)
        .subscribe(data => console.log(data));

      this._registerComponentRoute.navigate(["login"]);
    } else {
      return;
    }
  }
}
