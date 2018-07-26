import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserProfileComponent} from './user-profile/user-profile.component';

const userRoutes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(
      userRoutes,
    ),
  ],
  exports: [
    RouterModule,
  ],
})

export class UserRoutingModule {}
