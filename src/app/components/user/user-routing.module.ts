import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {HomepageComponent} from './homepage/homepage.component';

const userRoutes: Routes = [
  {
    path: 'profile/:id',
    component: UserProfileComponent,
  },
  {
    path: 'home',
    component: HomepageComponent,
  }
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
