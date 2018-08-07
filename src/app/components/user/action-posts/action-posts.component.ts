import { Component, OnInit, ViewChild, Input, TemplateRef, OnChanges, AfterViewInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ChangeNewsService } from '../../../_services/change-news.service';
import { UserService } from '../../../_services/user.service';
import { NewsType } from '../../../models/news-type';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <ng-template #actionPost let-c="close" let-d="dismiss">
      <div class="modal-header">
        <h4 class="modal-title">Edit post</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
        <p class="modal-subject">Subject:
          <input type="text" [(ngModel)]="post.subject">
        </p>

        <p class="modal-content">Content:
          <input type="text" [(ngModel)]="post.content">
        </p>

        <!--<p class="modal_tags">Tags:-->
        <!--<input type="email" [(ngModel)]="post.tags"> ???????? -->
        <!--</p>-->
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
      </div>
    </ng-template>
  `,
})
export class ActionPostsContent {
  post: NewsType;
  // @Input()
  // show: boolean;

  constructor(public activeModal: NgbActiveModal) { }
}

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
export class ActionPostsComponent implements AfterViewInit {
  post: NewsType;
  closeResult: string;

  constructor(
    private _changeNewsService: ChangeNewsService,
    private _modalService: NgbModal,
    private _userService: UserService,
  ) { }

  ngAfterViewInit(){
    setTimeout(() => {
      this.open();
    });
  }

  open() {
    this._changeNewsService.postEdit$
      .subscribe(
        res => this.post = this._changeNewsService.postToEdit
      );

    const modalRef = this._modalService.open(ActionPostsContent, { centered: true });
    modalRef.componentInstance.post = this.post; // initialize "inner component"

    modalRef
    .result
      .then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          //.....
          console.log(this.post);
          console.log(modalRef.componentInstance.post);
        },
        reason => this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
