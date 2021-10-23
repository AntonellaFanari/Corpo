import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMedicalCreateComponent } from './history-medical-create.component';

describe('HistoryMedicalCreateComponent', () => {
  let component: HistoryMedicalCreateComponent;
  let fixture: ComponentFixture<HistoryMedicalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryMedicalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryMedicalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
