import { TestBed, inject } from '@angular/core/testing';

import { GetfirebaseService } from './getfirebase.service';

describe('GetfirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetfirebaseService]
    });
  });

  it('should be created', inject([GetfirebaseService], (service: GetfirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
