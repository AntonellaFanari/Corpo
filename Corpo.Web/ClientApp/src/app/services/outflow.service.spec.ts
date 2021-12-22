import { TestBed } from '@angular/core/testing';

import { OutflowService } from './outflow.service';

describe('OutflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutflowService = TestBed.get(OutflowService);
    expect(service).toBeTruthy();
  });
});
