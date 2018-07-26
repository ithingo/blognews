import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewsListComponent } from './news-module/news-list/news-list.component';

const appRoutes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: 'all-feeds',
    component: NewsListComponent,
  },
  {
    path: '',
    redirectTo: 'all-feeds',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // temp for tracing in debug mode
      {enableTracing: true},
    ),
  ],
  exports: [
    RouterModule,
  ],
})

export class AppRoutingModule {}
