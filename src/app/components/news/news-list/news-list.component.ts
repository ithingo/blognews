import {Component, OnChanges, OnInit} from '@angular/core';
import { NewsType } from '../../../models/news-type';
import { ChangeNewsService } from '../../../_services/change-news.service';
import { GetNewsListService } from '../../../_services/get-news-list.service';

import * as _ from 'lodash';
import {Subject} from "rxjs";

@Component({
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent {
  titleForSearch = 'Type to search';
  textBeforeNews = 'What is new at the moment:';
  _itemNewsArray: NewsType[] = [];
  _postTagsSet: string[] = [];
  term = new Subject<string>();

  constructor(
    private _getNewsListService: GetNewsListService,
    private _changeNewsService: ChangeNewsService,
  ) {
    if(!this._itemNewsArray.length) {
      this._getNewsListService.getNews()
        .subscribe(result => this._itemNewsArray = result)
    }

    this._getNewsListService.search(this.term)
      .subscribe(result => this._itemNewsArray = result);
  }

    getArray(): Array<NewsType> {
      return this._itemNewsArray;    
    }

    handleFilterOption(event) {
       this._getNewsListService.optionToFilter = event;
    }
}
