import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalCreateComponent } from './withdrawal-create.component';

describe('WithdrawalCreateComponent', () => {
  let component: WithdrawalCreateComponent;
  let fixture: ComponentFixture<WithdrawalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
