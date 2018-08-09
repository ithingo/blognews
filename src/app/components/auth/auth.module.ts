import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthService } from '../../_services/auth.service';

import {FileUploadModule} from '../file-uploader/file-uploader.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  providers: [ AuthService ],
})
export class AuthModule {}
