import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryCreateComponent } from './medical-history-create.component';

describe('HistoryMedicalCreateComponent', () => {
  let component: MedicalHistoryCreateComponent;
  let fixture: ComponentFixture<MedicalHistoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalHistoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalHistoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
