import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTemplateEditComponent } from './assignment-template-edit.component';

describe('AssignmentTemplateEditComponent', () => {
  let component: AssignmentTemplateEditComponent;
  let fixture: ComponentFixture<AssignmentTemplateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentTemplateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
