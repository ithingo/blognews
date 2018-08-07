import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'feeds',
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
      // {enableTracing: true},
    ),
  ],
  exports: [
    RouterModule,
  ],
})

export class AppRoutingModule {}
