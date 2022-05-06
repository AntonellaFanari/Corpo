import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAssignmentDetailComponent } from './test-assignment-detail.component';

describe('TestAssignmentDetailComponent', () => {
  let component: TestAssignmentDetailComponent;
  let fixture: ComponentFixture<TestAssignmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAssignmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAssignmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
