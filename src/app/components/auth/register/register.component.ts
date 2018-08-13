import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  userPhoto: any = null;

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

  handleImageUploaded($event) {
    // console.log($event);
    this.userPhoto = $event;
  }

  register() {
    this.submitted = true;

    if (this.registerForm.valid) {

      const user: any = {
        'email': this.registerForm.value['email'].trim(),
        'password': this.registerForm.value['password'].trim(),
        'first_name': this.registerForm.value['first_name'].trim(),
        'second_name': this.registerForm.value['second_name'].trim(),
        'photo': "",
      }
      if(this.userPhoto) {
        user.photo = this.userPhoto;
      }

      this._authService.register(user)
        .subscribe(data => console.log(data['status']));

      this._registerComponentRoute.navigate(["login"]);
    } else {
      return;
    }
  }
}
