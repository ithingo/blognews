import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from '../user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
  ],
  declarations: [
    UserProfileComponent,
  ],
  providers: [ UserService ],
})
export class UserModule {}
