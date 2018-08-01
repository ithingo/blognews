import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { EditProfileWindowService } from '../../edit-profile-window.service';
import { UserType } from '../user-type';

@Component({
  selector: 'app-edit-profile-window',
  templateUrl: './edit-profile-window.component.html',
  styleUrls: ['./edit-profile-window.component.css']
})
export class EditProfileWindowComponent implements OnInit {
  @Input() id: string;
  @Input() user: UserType = null;

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

  constructor(private _editModalService: EditProfileWindowService) {
    // for temp mock data
    this.user_id = this.user.id;
    this.user_fullName = this.user.fullName;
    this.user_email = this.user.email;
    this.user_password = this.user.password;
    this.user_name = this.user.username;
    this.user_photo = this.user.photo;
  }

  ngOnInit() {
  }

  closeModal(id: string) {
    this._editModalService.close(id);
  }

}
