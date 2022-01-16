import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtEditComponent } from './debt-edit.component';

describe('DebtEditComponent', () => {
  let component: DebtEditComponent;
  let fixture: ComponentFixture<DebtEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
