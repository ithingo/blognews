import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsListComponent } from './news-list/news-list.component';
// import { NewsItemComponent } from './news-item/news-item.component';

const newsRoutes: Routes = [
  {
    path: 'feeds',
    component: NewsListComponent,
  },
  // {
  //   path: 'feeds/:id',
  //   component: NewsItemComponent,
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      newsRoutes,
    ),
  ],
  exports: [
    RouterModule,
  ],
})

export class NewsRoutingModule {}





