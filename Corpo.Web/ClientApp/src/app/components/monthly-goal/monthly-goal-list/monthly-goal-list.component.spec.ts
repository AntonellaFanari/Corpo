import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyGoalListComponent } from './monthly-goal-list.component';

describe('MonthlyGoalListComponent', () => {
  let component: MonthlyGoalListComponent;
  let fixture: ComponentFixture<MonthlyGoalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyGoalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyGoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
