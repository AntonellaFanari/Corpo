import { TestBed } from '@angular/core/testing';

import { WeeklyGoalService } from './weekly-goal.service';

describe('WeeklyGoalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeeklyGoalService = TestBed.get(WeeklyGoalService);
    expect(service).toBeTruthy();
  });
});
