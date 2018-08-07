import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsListComponent } from './news-list/news-list.component';

import { AlwaysAuthGuard } from '../../_guards/always-auth.guard';
import { OnlyLoggedInGuard } from '../../_guards/only-logged-in.guard';

const newsRoutes: Routes = [
  {
    path: 'feeds',
    component: NewsListComponent,
    canActivate: [
      OnlyLoggedInGuard,
      AlwaysAuthGuard,
    ],
  },
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





