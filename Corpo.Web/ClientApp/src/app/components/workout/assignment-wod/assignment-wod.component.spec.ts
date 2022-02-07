import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentWodComponent } from './assignment-wod.component';

describe('AssignmentWodComponent', () => {
  let component: AssignmentWodComponent;
  let fixture: ComponentFixture<AssignmentWodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentWodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentWodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
