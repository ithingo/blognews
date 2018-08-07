import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {

  @Input()
  iteratedNews: any;

  constructor() { }

  ngOnInit() {
  }

}
