import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryEditComponent } from './medical-history-edit.component';

describe('HistoryMedicalEditComponent', () => {
  let component: MedicalHistoryEditComponent;
  let fixture: ComponentFixture<MedicalHistoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalHistoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalHistoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
