import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAssignmentCreateComponent } from './test-assignment-create.component';

describe('TestAssignmentCreateComponent', () => {
  let component: TestAssignmentCreateComponent;
  let fixture: ComponentFixture<TestAssignmentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAssignmentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAssignmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
