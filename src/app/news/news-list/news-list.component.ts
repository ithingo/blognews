import { Component, OnInit } from '@angular/core';
import { NewsType } from '../news-type';
import { SelectionProperties } from '../search-selection/selection-properties';

import { NewsItemService } from '../../_services/news-item.service';

@Component({
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  titleForSearch = 'Type to search';
  textBeforeNews = 'What is new at the moment:';

  _optionToFilter: SelectionProperties = null;

  _itemNewsArray: NewsType[];

  _filteredArray: Array<NewsType> = [];

  constructor(
    private _newsService: NewsItemService,
  ) { }


  // this function should not be there!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // getToken() {
  //   return 'some-token.................';
  // }



  ngOnInit() {
    this.retrieveNews();
  }

  retrieveNews(): void {
    this._newsService.getNews()
      .subscribe(newsArray => this._itemNewsArray = newsArray);

    // const apiRoot = "http://127.0.0.1:8000/api/v1/posts.json?key="+ this.getToken() +"&";
    // this._newsService.ping(apiRoot);
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

  filterByKeywords(news: NewsType, keywords: string[], selectedOptionKey: string): NewsType {
    let isFounded = false;

    const checkBySelectedOption = (currNews: NewsType, inputKey: string, optionKey: string): boolean => {
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
  getArray(): Array<NewsType> {
    return this._filteredArray.length !== 0 ? this._filteredArray : this._itemNewsArray;
  }

  handleFilterOption(event) {
    this._optionToFilter = event;
  }
}
