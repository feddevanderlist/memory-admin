import { TestBed } from '@angular/core/testing';

import { TopFiveServiceService } from './top-five-service.service';

describe('TopFiveServiceService', () => {
  let service: TopFiveServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopFiveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
