import { ChangeDetectorRef, Component, ElementRef, Input, Output, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { EventEmitter } from 'events';

import { EditProfileWindowService } from '../../edit-profile-window.service';
import { UserType } from '../user-type';

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
  @Input() closable = true;
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private user: UserType;  // there should be user after retreaving via service from cookies

  // private user_first_name: string;
  // private user_second_name: string;
  // private user_email: string;
  // private user_password: string;
  // private user_password_confirmation: string;

  // for temp mock data, real field are upset
  private user_id: number;
  private user_fullName: string;
  private user_email: string;
  private user_password: string;
  private user_name: string;
  private user_photo: string;

  constructor(
    private _editModalService: EditProfileWindowService,
    private _element: ElementRef
  ) {
    this._element = _element.nativeElement;

    // for temp mock data
    this.user_id = this.user.id;
    this.user_fullName = this.user.fullName;
    this.user_email = this.user.email;
    this.user_password = this.user.password;
    this.user_name = this.user.username;
    this.user_photo = this.user.photo;
  }

  ngOnInit() {
    const modal = this;


    this._editModalService.add(modal)
  }

  open() {
    this.visible = true;
    this.visibleChange.emit(this.visible);
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
