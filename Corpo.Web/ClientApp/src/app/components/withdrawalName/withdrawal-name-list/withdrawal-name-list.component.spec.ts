import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalNameListComponent } from './withdrawal-name-list.component';

describe('WithdrawalNameListComponent', () => {
  let component: WithdrawalNameListComponent;
  let fixture: ComponentFixture<WithdrawalNameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalNameListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalNameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
