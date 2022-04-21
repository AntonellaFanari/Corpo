import { TestBed } from '@angular/core/testing';

import { TrainingSystemService } from './training-system.service';

describe('TrainingSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainingSystemService = TestBed.get(TrainingSystemService);
    expect(service).toBeTruthy();
  });
});
