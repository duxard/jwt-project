import { TestBed } from '@angular/core/testing';

import { SpecialEventsService } from './special-events.service';

describe('SpecialEventsService', () => {
  let service: SpecialEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
