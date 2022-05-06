import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAssignmentListComponent } from './test-assignment-list.component';

describe('TestAssignmentListComponent', () => {
  let component: TestAssignmentListComponent;
  let fixture: ComponentFixture<TestAssignmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAssignmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
