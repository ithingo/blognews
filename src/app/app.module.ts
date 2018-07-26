import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NewsComponent } from './news-module/news/news.component';
import { SearchSelectionComponent } from './search-selection/search-selection.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewsListComponent } from './news-module/news-list/news-list.component';

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
    AppRoutingModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
