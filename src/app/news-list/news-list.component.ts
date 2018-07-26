import { Component, OnInit } from '@angular/core';
import { News } from '../news/news';
import { SelectionProperties } from '../search-selection/selection-properties';

import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  titleForSearch = 'Type to search';
  textBeforeNews = 'What is new at the moment:';

  _optionToFilter: SelectionProperties = null;

  _itemNewsArray: News[];

  // Array filtered by input text's key words
  _filteredArray: Array<News> = [];

  constructor(private _newsService: NewsService) { }

  ngOnInit() {
    this.retrieveNews();
  }

  retrieveNews(): void {
    // this._itemNewsArray = this.newsService.getNews(); // get data array from service, yay!!
    this._newsService.getNews()
      .subscribe(newsArray => this._itemNewsArray = newsArray);
  }

  // Method invoked on 'oninput' event for input field
  searchNews(event: any) {
    const keyword: string = event.target.value;
    const keywords = keyword.split(' ');

    const selectedOptionKey = this._optionToFilter.key;

    this._filteredArray = [];

    this._itemNewsArray.forEach(news => {
      // this._filteredArray.push();
      this._filteredArray.push(this.filterByKeywords(news, keywords, selectedOptionKey));
    });
    this._filteredArray = this._filteredArray.filter(function( element ) {
      return element !== undefined;
    });
  }

  filterByKeywords(news: News, keywords: string[], selectedOptionKey: string): News {
    let isFounded = false;

    const checkBySelectedOption = (currNews: News, inputKey: string, optionKey: string): boolean => {
      const filters = {
        'all': () => {
          if (news.subject.includes(inputKey) || news.content.includes(inputKey) || news.person.fullName.includes(inputKey)) {
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
          if (news.person.fullName.includes(inputKey)) {
            return true;
          }
        },
        // 'tags':  () => {
        //
        // },
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
  getArray(): Array<News> {
    return this._filteredArray.length !== 0 ? this._filteredArray : this._itemNewsArray;
  }

  handleFilterOption(event) {
    this._optionToFilter = event;
  }
}
