import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileWindowComponent } from './edit-profile-window.component';

describe('EditProfileWindowComponent', () => {
  let component: EditProfileWindowComponent;
  let fixture: ComponentFixture<EditProfileWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
