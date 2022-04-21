import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSystemListComponent } from './training-system-list.component';

describe('TrainingSystemListComponent', () => {
  let component: TrainingSystemListComponent;
  let fixture: ComponentFixture<TrainingSystemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingSystemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSystemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
