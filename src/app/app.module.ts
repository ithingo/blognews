import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { SearchSelectionComponent } from './search-selection/search-selection.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewsListComponent } from './news-list/news-list.component';


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
  declarations: [
    AppComponent,
    NewsComponent,
    SearchSelectionComponent,
    UserProfileComponent,
    PageNotFoundComponent,
    NewsListComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // temp for tracing in debug mode
      {enableTracing: true},
    ),
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
