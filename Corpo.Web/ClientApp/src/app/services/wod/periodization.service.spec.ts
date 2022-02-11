import { TestBed } from '@angular/core/testing';

import { PeriodizationService } from './periodization.service';

describe('PeriodizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeriodizationService = TestBed.get(PeriodizationService);
    expect(service).toBeTruthy();
  });
});
