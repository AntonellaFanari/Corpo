import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutPeriodizaionEditComponent } from './workout-periodizaion-edit.component';

describe('WorkoutPeriodizaionEditComponent', () => {
  let component: WorkoutPeriodizaionEditComponent;
  let fixture: ComponentFixture<WorkoutPeriodizaionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutPeriodizaionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutPeriodizaionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
