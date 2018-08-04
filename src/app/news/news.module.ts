import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewsListComponent } from './news-list/news-list.component';
import { NewsItemComponent } from './news-item/news-item.component';

import { NewsItemService } from '../_services/news-item.service';
import { NewsRoutingModule } from './news-routing.module';
import { SearchSelectionComponent } from './search-selection/search-selection.component';

import { AlwaysAuthGuard } from '../_guards/always-auth.guard';
import { OnlyLoggedInGuard } from '../_guards/only-logged-in.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NewsRoutingModule,
  ],
  declarations: [
    NewsListComponent,
    NewsItemComponent,
    SearchSelectionComponent,
  ],
  providers: [
    NewsItemService,
    AlwaysAuthGuard,
    OnlyLoggedInGuard,
  ]
})
export class NewsModule {}
