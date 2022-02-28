import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyGoalEditComponent } from './weekly-goal-edit.component';

describe('WeeklyGoalEditComponent', () => {
  let component: WeeklyGoalEditComponent;
  let fixture: ComponentFixture<WeeklyGoalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyGoalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyGoalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
