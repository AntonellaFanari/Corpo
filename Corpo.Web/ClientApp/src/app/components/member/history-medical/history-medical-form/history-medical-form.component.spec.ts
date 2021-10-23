import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMedicalFormComponent } from './history-medical-form.component';

describe('HistoryMedicalFormComponent', () => {
  let component: HistoryMedicalFormComponent;
  let fixture: ComponentFixture<HistoryMedicalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryMedicalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryMedicalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
