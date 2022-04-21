import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSystemEditComponent } from './training-system-edit.component';

describe('TrainingSystemEditComponent', () => {
  let component: TrainingSystemEditComponent;
  let fixture: ComponentFixture<TrainingSystemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingSystemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSystemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
