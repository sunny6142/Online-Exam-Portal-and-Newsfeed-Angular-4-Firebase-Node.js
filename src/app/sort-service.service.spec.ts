import { TestBed, inject } from '@angular/core/testing';

import { SortServiceService } from './sort-service.service';

describe('SortServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortServiceService]
    });
  });

  it('should be created', inject([SortServiceService], (service: SortServiceService) => {
    expect(service).toBeTruthy();
  }));
});
