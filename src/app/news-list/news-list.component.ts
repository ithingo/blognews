import { Component, OnInit } from '@angular/core';
import { News } from '../news/news';
import { SelectionProperties } from '../search-selection/selection-properties';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  titleForSearch = 'Type to search';
  textBeforeNews = 'What is new at the moment:';

  _optionToFilter: SelectionProperties = null;

  _itemNewsArray: News[] = [
    {
      subject: 'I am leading!',
      content: `Finally we won! Thanks to all people that have voted for me this election.
        Although I cannot make all Americans free from that Beast, I swear the people of
        Independent California Republic will be free forever!`,
      person: {
        'imageUrl': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Hillary_Clinton_Testimony_to_House_Select_Committee_on_Benghazi_%281%29.png/200px-Hillary_Clinton_Testimony_to_House_Select_Committee_on_Benghazi_%281%29.png',
        'fullName': 'Hillary Clinton',
      }
    },
    {
      subject: 'Make America Great Forever!',
      content: `Crooked Hillary wins again... She will destroy the California like she has destroyed the US.
        But I swear to all people that I will make the America great whatever trouble may come`,
      person: {
        'imageUrl': 'https://ly.usembassy.gov/wp-content/uploads/sites/246/16114538_1227645557304882_4439457132240667293_n-1.jpg',
        'fullName': 'Donald J. Trump',
      }
    },
    {
      subject: 'Lord of the Light warnings',
      content: `We, the servants of the Lord of the Light, warns you that difficult times is to come.
        We should all prepare for the Long Night. For the night is dark and full of terrors`,
      person: {
        'imageUrl': 'https://www.telegraph.co.uk/content/dam/tv/2016/04/25/melisandre_trans_NvBQzQNjv4BqutubNGxeqbD0m2XylzINLiOoem_3qpp9C-iKHR23jxY.jpg?imwidth=1400',
        'fullName': 'Melisandre',
      }
    },
    {
      subject: 'Winter is coming',
      content: `To all lords of Seven Kingdoms. Winter is coming!
        All people should prepare for the Long Night. We need more man in the Night Watch!
        Please send whoever you have: bastards, prisoners etc. Jon Snow, Lord Commander of the Night Watch`,
      person: {
        'imageUrl': 'https://pmctvline2.files.wordpress.com/2016/02/game-of-thrones-jon-snow.jpg',
        'fullName': 'Jon Snow',
      }
    },
    {
      subject: 'I am tired',
      content: `I am tired, I leave my boring kingdom.... I want more: I want to rule the See, like Poseidon, or the Heavens, like Zeus.
        I hate all these shadows in this dark place. Al right, I made a decision... But I should borrow my Fluffy with me....`,
      person: {
        'imageUrl': 'https://ohmy.disney.com/wp-content/uploads/2014/05/Reasons-We-Cant-Help-but-Love-Hades-Fiery.png',
        'fullName': 'Hades',
      }
    },
  ];

  // Array filtered by input text's key words
  _filteredArray: Array<News> = [];

  constructor() { }

  ngOnInit() {
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
