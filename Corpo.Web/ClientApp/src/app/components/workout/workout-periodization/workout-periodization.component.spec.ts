import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutPeriodizationComponent } from './workout-periodization.component';

describe('WorkoutPeriodizationComponent', () => {
  let component: WorkoutPeriodizationComponent;
  let fixture: ComponentFixture<WorkoutPeriodizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutPeriodizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutPeriodizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
