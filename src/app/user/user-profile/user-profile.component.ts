import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { NewsItemService } from '../../news-item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // user$: Observable<any>; // AT THAT POINT USE *ANY* TYPE, LATER - USER TYPE
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsItemService,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userObservable = this.route.paramMap.pipe(
      // display news, later add user model, service for it and retrieve user data by id
      switchMap((params: ParamMap) => this.newsService.getNews())
    );

    userObservable.subscribe(user => this.user = user);
    console.log(this.user);
  }
}
