import { ChangeDetectorRef, Component, ElementRef, Input, Output, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { EventEmitter } from 'events';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { UserType } from '../user-type';
import { UserService } from '../../_services/user.service';

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

  private user: UserType;  // there should be user after retreaving via service from cookies

  user_first_name: string;
  user_second_name: string;
  user_email: string;
  user_photo: string;

  constructor(
    private _modalService: NgbModal,
    private _userService: UserService,
  ) {
    // // for temp mock data
    // this.user_id = this.user.id;
    // this.user_fullName = this.user.fullName;
    // this.user_email = this.user.email;
    // this.user_password = this.user.password;
    // this.user_name = this.user.username;
    // this.user_photo = this.user.photo;
  }

  ngOnInit() {
  }

  open(content) {
    console.log(this._userService.getCurrentUserId());

    this._userService.getUserById(
      +(this._userService.getCurrentUserId())
    )
      .subscribe(data => console.log({'current user ->': data}))

    this._modalService.open(content, { centered: true }).result
      .then(
        result => this.closeResult = `Closed with: ${result}`,
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
