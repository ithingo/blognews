import { TestBed, inject } from '@angular/core/testing';

import { ChangeNewsService } from './change-news.service';

describe('ChangeNewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeNewsService]
    });
  });

  it('should be created', inject([ChangeNewsService], (service: ChangeNewsService) => {
    expect(service).toBeTruthy();
  }));
});
