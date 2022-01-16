import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalNameCreateComponent } from './withdrawal-name-create.component';

describe('WithdrawalNameCreateComponent', () => {
  let component: WithdrawalNameCreateComponent;
  let fixture: ComponentFixture<WithdrawalNameCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalNameCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalNameCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
