import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentMemberComponent } from './assignment-member.component';

describe('AssignmentMemberComponent', () => {
  let component: AssignmentMemberComponent;
  let fixture: ComponentFixture<AssignmentMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
