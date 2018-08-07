import { Component, ViewChild, Input, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ChangeNewsService } from '../../../_services/change-news.service';
import { UserService } from '../../../_services/user.service';
import { NewsType } from '../../../models/news-type';

@Component({
  selector: 'app-update-posts-window',
  templateUrl: './action-posts.component.html',
  styleUrls: ['./action-posts.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(0.3, 0.3, 0.3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(0.0, 0.0, 0.0)' }))
      ])
    ])
  ],
})
export class ActionPostsComponent implements OnChanges {
  postData: any;

  closeResult: string;

  @Input()
  show: boolean;

  @Input()
  post: NewsType;

  @ViewChild('editPost')
  modalRef: TemplateRef<any>;

  constructor(
    private _changeNewsService: ChangeNewsService,
    private _modalService: NgbModal,
    private _userService: UserService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['show'] && changes['show'].currentValue) {
      this.open(this.modalRef);
      this.postData.subject = changes['post'].currentValue.subject;
    this.postData.content = this.post.content;
    }
  }

  open(content) {
    // this.postData.subject = this.post.subject;
    // this.postData.content = this.post.content;
    // this.postData.tags = this.post.tags;

    this._modalService.open(content, { centered: true }).result
      .then(
        res => this.closeResult = 'Success',
        reason => this.closeResult = 'Closed some reasoon'
     )
  }
}
