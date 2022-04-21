import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSystemCreateComponent } from './training-system-create.component';

describe('TrainingSystemCreateComponent', () => {
  let component: TrainingSystemCreateComponent;
  let fixture: ComponentFixture<TrainingSystemCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingSystemCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSystemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
