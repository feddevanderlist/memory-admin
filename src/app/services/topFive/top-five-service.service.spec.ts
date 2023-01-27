import { TestBed } from '@angular/core/testing';

import { TopFiveService } from './top-five.service';

describe('TopFiveServiceService', () => {
  let service: TopFiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopFiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
