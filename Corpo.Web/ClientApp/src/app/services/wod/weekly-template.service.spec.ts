import { TestBed } from '@angular/core/testing';

import { WeeklyTemplateService } from './weekly-template.service';

describe('WeeklyTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeeklyTemplateService = TestBed.get(WeeklyTemplateService);
    expect(service).toBeTruthy();
  });
});
