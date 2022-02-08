import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentCalendarComponent } from './assignment-calendar.component';

describe('AssignmentCalendarComponent', () => {
  let component: AssignmentCalendarComponent;
  let fixture: ComponentFixture<AssignmentCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
