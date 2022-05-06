import { TestBed } from '@angular/core/testing';

import { TestMemberService } from './test-member.service';

describe('TestMemberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestMemberService = TestBed.get(TestMemberService);
    expect(service).toBeTruthy();
  });
});
