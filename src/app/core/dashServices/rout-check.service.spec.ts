import { TestBed } from '@angular/core/testing';

import { RoutCheckService } from './rout-check.service';

describe('RoutCheckService', () => {
  let service: RoutCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
