import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceShiftsListComponent } from './attendance-shifts-list.component';

describe('AttendanceShiftsListComponent', () => {
  let component: AttendanceShiftsListComponent;
  let fixture: ComponentFixture<AttendanceShiftsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceShiftsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceShiftsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
