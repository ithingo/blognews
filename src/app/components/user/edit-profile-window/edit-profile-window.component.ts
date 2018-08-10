import { ChangeDetectorRef, Component, ElementRef, Input, Output, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { EventEmitter } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { UserType } from '../../../models/user-type';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-edit-profile-window',
  templateUrl: './edit-profile-window.component.html',
  styleUrls: ['./edit-profile-window.component.css'],
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
  ]
})
export class EditProfileWindowComponent implements OnInit {
  closeResult: string;

  private _user: UserType;
  userDataCopy: any;

  private _uploadedPhoto: any = null;

  @Output()
  userChanged: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private _modalService: NgbModal,
    private _userService: UserService,
  ) { }

  ngOnInit() {
  }

  open(content) {

    this._user = this._userService.getCurrentUser();
    this.userDataCopy = {
          'email': this._user.email,
          'first_name': this._user.first_name,
          'second_name': this._user.second_name,
          'photo': this._user.photo,
      };

    this._modalService.open(content, { centered: true }).result
      .then(
        result => {
            this.closeResult = `Closed with: ${result}`;

            if(this._uploadedPhoto) {
              this.userDataCopy.photo = this._uploadedPhoto;
            }

            this._userService.updateUserData(this._user, this.userDataCopy);
            this.userChanged.emit(true);
          },
            reason => this.closeResult = `Dismissed ${this.getDismissReason(reason)}`

      );
  }

  handleImageUploaded($event) {
    this._uploadedPhoto = $event;
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
