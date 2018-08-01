import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileWindowComponent } from './edit-profile-window/edit-profile-window.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from '../user.service';
import {EditProfileWindowService} from '../edit-profile-window.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
  ],
  declarations: [
    UserProfileComponent,
    EditProfileWindowComponent,
  ],
  providers: [
    UserService,
    EditProfileWindowService,
  ],
})
export class UserModule {}
