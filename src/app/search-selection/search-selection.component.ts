import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectionProperties } from './selection-properties';

@Component({
  selector: 'app-search-selection',
  templateUrl: './search-selection.component.html',
  styleUrls: ['./search-selection.component.css']
})
export class SearchSelectionComponent implements OnInit {

  selectOptions: SelectionProperties[] = [
    {
      key: 'all',
      value: 'Entire posts',
    },
    {
      key: 'subject',
      value: 'News subject',
    },
    {
      key: 'content',
      value: 'News content',
    },
    {
      key: 'author',
      value: 'Author name',
    },
    {
      key: 'tags',
      value: 'Tags',
    },
  ];

  selectedOption = null;

  @Output()
  selection = new EventEmitter<SelectionProperties>();

  constructor() { }

  ngOnInit() {
  }

  printSelectedOption() {
    console.log(this.selectedOption);
    console.log(typeof this.selectedOption);

    this.selection.emit(this.selectedOption);
  }
}
