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
      value: 'NewsType subject',
    },
    {
      key: 'content',
      value: 'NewsType content',
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

  selectedOption: SelectionProperties = null;

  @Output()
  selection = new EventEmitter<SelectionProperties>();

  constructor() { }

  ngOnInit() {
    this.selectedOption = {
      key: 'all',
      value: 'Entire posts',
    };
  }

  printSelectedOption() {
    this.selection.emit(this.selectedOption);
  }
}
