import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTemplateFormComponent } from './assignment-template-form.component';

describe('AssignmentTemplateFormComponent', () => {
  let component: AssignmentTemplateFormComponent;
  let fixture: ComponentFixture<AssignmentTemplateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentTemplateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
