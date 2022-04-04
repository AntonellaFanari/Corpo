import { TestBed } from '@angular/core/testing';

import { IntensityService } from './intensity.service';

describe('IntensityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntensityService = TestBed.get(IntensityService);
    expect(service).toBeTruthy();
  });
});
