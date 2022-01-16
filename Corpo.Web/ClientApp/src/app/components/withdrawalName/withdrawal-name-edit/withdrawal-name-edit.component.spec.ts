import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalNameEditComponent } from './withdrawal-name-edit.component';

describe('WithdrawalNameEditComponent', () => {
  let component: WithdrawalNameEditComponent;
  let fixture: ComponentFixture<WithdrawalNameEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalNameEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalNameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
