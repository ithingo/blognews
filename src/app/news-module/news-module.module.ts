import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewsListComponent } from './news-list/news-list.component';
import { NewsComponent } from './news/news.component';

import { NewsService } from '../news.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    NewsListComponent,
    NewsComponent
  ],
  providers: [ NewsService ]
})
export class HeroesModule {}
