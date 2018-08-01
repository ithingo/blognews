import { TestBed, inject } from '@angular/core/testing';

import { EditProfileWindowService } from './edit-profile-window.service';

describe('EditProfileWindowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditProfileWindowService]
    });
  });

  it('should be created', inject([EditProfileWindowService], (service: EditProfileWindowService) => {
    expect(service).toBeTruthy();
  }));
});
