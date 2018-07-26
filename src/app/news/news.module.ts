import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewsListComponent } from './news-list/news-list.component';
import { NewsItemComponent } from './news-item/news-item.component';

import { NewsItemService } from '../news-item.service';
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NewsRoutingModule,
  ],
  declarations: [
    NewsListComponent,
    NewsItemComponent
  ],
  providers: [ NewsItemService ]
})
export class NewsModule {}
