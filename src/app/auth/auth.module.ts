import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthService } from '../_services/auth.service';
// import { AuthGuard } from '../_guards/auth.guard';

import { ConfirmPasswordValidationDirective } from './confirm-password-validation.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmPasswordValidationDirective,
  ],
  providers: [ AuthService ],
})
export class AuthModule {}
