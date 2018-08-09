import {Component, OnChanges, OnInit} from '@angular/core';
import { NewsType } from '../../../models/news-type';
import { SelectionProperties } from '../search-selection/selection-properties';
import { ChangeNewsService } from '../../../_services/change-news.service';
import { GetNewsListService } from '../../../_services/get-news-list.service';

import * as _ from 'lodash';

@Component({
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnChanges {
  titleForSearch = 'Type to search';
  textBeforeNews = 'What is new at the moment:';

  separator = " ";

  _optionToFilter: SelectionProperties = null;

  _itemNewsArray: NewsType[];

  _postTagsSet: string[] = [];

  _filteredArray: Array<NewsType> = [];

  constructor(
    private _getNewsListService: GetNewsListService,
    private _changeNewsService: ChangeNewsService,
  ) { }

  ngOnInit() {
    this.retrieveNews();
  }

  ngOnChanges(changes: any) {
  }

  retrieveNews(): void {
    this._getNewsListService.getNews()
      .subscribe(newsArray => {
        this._itemNewsArray = newsArray;
        this.retrieveAllTags(newsArray);
      });
  }

  retrieveAllTags(newsArray: NewsType[]): void {
    newsArray.forEach(newsItem => {
      if(newsItem.tags) {
        const itemTagsArr = newsItem.tags.split(this.separator);
        this._postTagsSet.push(...itemTagsArr);
      }
    });

    this._postTagsSet = _.uniq(this._postTagsSet);
    this._changeNewsService.tags = this._postTagsSet;
    console.log({'hello': this._postTagsSet});
  }

  // Method invoked on 'oninput' event for input field
  searchNews(event: any) {
    this.retrieveNews();
    this._filteredArray = [];

    const keyword: string = event.target.value;
    const keywords = keyword.split(' ');

    const selectedOptionKey = this._optionToFilter.key;


    this._itemNewsArray.forEach(news => {
      this._filteredArray.push(this.filterByKeywords(news, keywords, selectedOptionKey));
    });
    this._filteredArray = this._filteredArray.filter(function( element ) {
      return element !== undefined;
    });
  }

  filterByKeywords(news: NewsType, keywords: string[], selectedOptionKey: string): NewsType {
    let isFounded = false;

    const checkBySelectedOption = (currNews: NewsType, inputKey: string, optionKey: string): boolean => {
      const filters = {
        'all': () => {
          if (news.subject.includes(inputKey)
            || news.content.includes(inputKey)
            || news.author.first_name.includes(inputKey)
            || news.author.second_name.includes(inputKey)) {
            return true;
          }
        },
        'subject': () => {
          if (news.subject.includes(inputKey)) {
            console.log(inputKey);
            return true;
          }
        },
        'content': () => {
          if (news.content.includes(inputKey)) {
            return true;
          }
        },
        'author': () => {
          if (news.author.first_name.includes(inputKey) || news.author.second_name.includes(inputKey)) {
            return true;
          }
        },
        'tags':  () => {
          if (news.tags && news.tags.includes(inputKey)) {
            return true;
          }
        },
      };

      return filters[optionKey]();
    };

    keywords.forEach(key => {
      isFounded = checkBySelectedOption(news, key, selectedOptionKey);
    });
    if (isFounded) {
      return news;
    }
  }

  // Get default array or filtered by keywords
  getArray(): Array<NewsType> {
    return this._filteredArray.length !== 0 ? this._filteredArray : this._itemNewsArray;
  }

  getTags(): Array<string> {
    return this._postTagsSet;
  }

  handleFilterOption(event) {
    this._optionToFilter = event;
  }
}
