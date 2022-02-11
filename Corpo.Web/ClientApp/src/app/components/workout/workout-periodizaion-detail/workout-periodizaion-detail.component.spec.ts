import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutPeriodizaionDetailComponent } from './workout-periodizaion-detail.component';

describe('WorkoutPeriodizaionDetailComponent', () => {
  let component: WorkoutPeriodizaionDetailComponent;
  let fixture: ComponentFixture<WorkoutPeriodizaionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutPeriodizaionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutPeriodizaionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
