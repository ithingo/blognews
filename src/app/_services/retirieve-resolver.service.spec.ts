import { TestBed, inject } from '@angular/core/testing';

import { RetirieveResolverService } from './retirieve-resolver.service';

describe('RetirieveResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RetirieveResolverService]
    });
  });

  it('should be created', inject([RetirieveResolverService], (service: RetirieveResolverService) => {
    expect(service).toBeTruthy();
  }));
});
