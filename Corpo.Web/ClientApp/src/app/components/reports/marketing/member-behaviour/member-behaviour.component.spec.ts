import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBehaviourComponent } from './member-behaviour.component';

describe('MemberBehaviourComponent', () => {
  let component: MemberBehaviourComponent;
  let fixture: ComponentFixture<MemberBehaviourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberBehaviourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberBehaviourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
