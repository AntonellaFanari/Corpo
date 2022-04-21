import { TestBed } from '@angular/core/testing';

import { TestTemplateService } from './test-template.service';

describe('TestTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestTemplateService = TestBed.get(TestTemplateService);
    expect(service).toBeTruthy();
  });
});
