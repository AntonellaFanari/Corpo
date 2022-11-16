import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashOpeningComponent } from './cash-opening.component';

describe('CashOpeningComponent', () => {
  let component: CashOpeningComponent;
  let fixture: ComponentFixture<CashOpeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashOpeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
