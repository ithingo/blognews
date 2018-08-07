import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { NewsType } from '../models/news-type';

@Injectable({
  providedIn: 'root'
})
export class ChangeNewsService {

  public postAdd$ = new Subject();
  public postEdit$ = new Subject();
  public postDelete$ = new Subject();

  public postToEdit;

  constructor() {
    this.postToEdit = new NewsType();
  }

  notifyPostAdding() {
    this.postAdd$.next();
  }

  notifyPostEditing() {
    this.postEdit$.next();
  }

  notifyPostDeleting() {
    this.postDelete$.next();
  }

  setPostToEdit(post: NewsType) {
    this.postToEdit = post;
    this.notifyPostEditing();
  }
}
