import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyGoalListComponent } from './weekly-goal-list.component';

describe('WeeklyGoalListComponent', () => {
  let component: WeeklyGoalListComponent;
  let fixture: ComponentFixture<WeeklyGoalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyGoalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyGoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
