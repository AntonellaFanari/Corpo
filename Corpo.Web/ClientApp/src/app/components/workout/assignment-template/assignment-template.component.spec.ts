import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTemplateComponent } from './assignment-template.component';

describe('AssignmentTemplateComponent', () => {
  let component: AssignmentTemplateComponent;
  let fixture: ComponentFixture<AssignmentTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
