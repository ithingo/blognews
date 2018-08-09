import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileWindowComponent } from './edit-profile-window/edit-profile-window.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from '../../_services/user.service';
import {FileUploaderComponent, FileUploadModule} from '../file-uploader/file-uploader.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    NgbModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserProfileComponent,
    EditProfileWindowComponent,
  ],
  providers: [
    UserService,
  ],
})
export class UserModule {}
