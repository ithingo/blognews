import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../_services/auth.service';

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
      this._authService.sendToken(this.registerForm.value.email);  // temp save email as a token instead of token retrieved from server
      this._registerComponentRoute.navigate(['login']);
    } else {
      return;
    }
  }
}
