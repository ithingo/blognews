import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'All news list';
  textBeforeNews = 'What is new at the moment:';
  itemNewsArray: Array<string> = [
    'Hillary Clinton became the president of independent California Republic',
    'Kim Jong Un was awarded as the main peace-maker',
    'Mr Mask send a thousandth car into space'
  ];
}
