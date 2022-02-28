import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyGoalCreateComponent } from './weekly-goal-create.component';

describe('WeeklyGoalCreateComponent', () => {
  let component: WeeklyGoalCreateComponent;
  let fixture: ComponentFixture<WeeklyGoalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyGoalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyGoalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
