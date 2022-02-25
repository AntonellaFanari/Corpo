import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyGoalCreateComponent } from './monthly-goal-create.component';

describe('MonthlyGoalCreateComponent', () => {
  let component: MonthlyGoalCreateComponent;
  let fixture: ComponentFixture<MonthlyGoalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyGoalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyGoalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
