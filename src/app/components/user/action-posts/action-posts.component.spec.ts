import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPostsComponent } from './action-posts.component';

describe('ActionPostsComponent', () => {
  let component: ActionPostsComponent;
  let fixture: ComponentFixture<ActionPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
