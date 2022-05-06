import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAssignmentEditComponent } from './test-assignment-edit.component';

describe('TestAssignmentEditComponent', () => {
  let component: TestAssignmentEditComponent;
  let fixture: ComponentFixture<TestAssignmentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAssignmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAssignmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
