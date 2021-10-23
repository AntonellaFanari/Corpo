import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMedicalDetailComponent } from './history-medical-detail.component';

describe('HistoryMedicalDetailComponent', () => {
  let component: HistoryMedicalDetailComponent;
  let fixture: ComponentFixture<HistoryMedicalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryMedicalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryMedicalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
