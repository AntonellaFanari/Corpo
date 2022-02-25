import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyGoalEditComponent } from './monthly-goal-edit.component';

describe('MonthlyGoalEditComponent', () => {
  let component: MonthlyGoalEditComponent;
  let fixture: ComponentFixture<MonthlyGoalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyGoalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyGoalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
