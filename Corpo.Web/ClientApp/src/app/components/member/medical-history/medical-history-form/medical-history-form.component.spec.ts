import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryFormComponent } from './medical-history-form.component';

describe('HistoryMedicalFormComponent', () => {
  let component: MedicalHistoryFormComponent;
  let fixture: ComponentFixture<MedicalHistoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalHistoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
