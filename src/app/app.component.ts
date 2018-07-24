import { Component } from '@angular/core';

// Temporary interface, later - separated component
interface News {
  newsTitle: string;
  imageLink: string;
  content: string;
  // [hashtag: string]: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'All news list';
  titleForSearch = 'Type to search';
  textBeforeNews = 'What is new at the moment:';
  _itemNewsArray: News[] = [
    {
      'newsTitle': 'Breaking news: Hillary - President!',
      'imageLink': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Hillary_Clinton_Testimony_to_House_Select_Committee_on_Benghazi_%281%29.png/200px-Hillary_Clinton_Testimony_to_House_Select_Committee_on_Benghazi_%281%29.png',
      'content': 'Hillary Clinton became the president of independent California Republic',
    },
    {
      'newsTitle': 'Make North Korea great again!',
      'imageLink': 'http://www.ddinews.gov.in/sites/default/files/kimoo.jpg',
      'content': 'Kim Jong Un was awarded as the main peace-maker',
    },
    {
      'newsTitle': `To "Space" and further`,
      'imageLink': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Elon_Musk_2015.jpg/267px-Elon_Musk_2015.jpg',
      'content': 'Elon Musk send a thousandth car into space',
    },
    {
      'newsTitle': `I'll shake the universe!`,
      'imageLink': 'https://vignette.wikia.nocookie.net/fictional-battle-omniverse/images/e/e0/Hades_Disney.png/revision/latest/scale-to-width-down/300?cb=20171108000219',
      'content': 'Hades became tha main Olympic god instead of Zeus',
    },
    {
      'newsTitle': `VB lives forever`,
      'imageLink': 'https://static.memrise.com/img/400sqf/from/uploads/course_photos/3146044000151118233245.jpg',
      'content': 'Visual Basic drops down the rating of C/C++ and Java',
    },
    {
      'newsTitle': `Bill Gates loves Apple`,
      'imageLink': 'https://news.microsoft.com/uploads/2017/03/gates_page.png',
      'content': 'Bill Gates became the CEO of Apple, Inc.',
    },
    {
      'newsTitle': `Train your memory`,
      'imageLink': 'https://getlighthouse.com/blog/wp-content/uploads/2015/04/Screen-Shot-2015-04-29-at-11.46.50-PM.png',
      'content': 'I lost all my stickers, so I remember nothing',
    },
  ];

  // Array filtered by input text's key words
  _filteredArray: Array<News> = [];
  // Method invoked on 'oninput' event for input field
  searchNews(event: any) {
    const keyword: string = event.target.value;
    const keywords = keyword.split(' ');
    this._filteredArray = [];

    this._itemNewsArray.forEach(news => {
      // this._filteredArray.push();
      this._filteredArray.push(this.filterByKeywords(news, keywords));
    });
    this._filteredArray = this._filteredArray.filter(function( element ) {
      return element !== undefined;
    });
  }

  filterByKeywords(news: News, keywords: string[]): News {
    let isFounded = false;
    keywords.forEach(key => {
      if (news.newsTitle.includes(key) || news.content.includes(key)) {
        isFounded = true;
      }

    });
    if (isFounded) {
      return news;
    }
  }

  // Get default array or filtered by keywords
  getArray(): Array<News> {
    return this._filteredArray.length !== 0 ? this._filteredArray : this._itemNewsArray;
  }
}
