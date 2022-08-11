import { TestBed } from '@angular/core/testing';

import { BalancePaidService } from './balance-paid.service';

describe('BalancePaidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BalancePaidService = TestBed.get(BalancePaidService);
    expect(service).toBeTruthy();
  });
});
