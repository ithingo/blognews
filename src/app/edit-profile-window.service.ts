import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditProfileWindowService {
  private modals: any[] = [];

  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(active_modal => active_modal.id !== id);
  }

  open(id: string) {
    // open modal specified by id
    const modal: any = this.modals.filter(active_modal => active_modal.id === id)[0];
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    const modal: any = this.modals.filter(active_modal => active_modal.id === id)[0];
    modal.close();
  }
  constructor() { }
}
