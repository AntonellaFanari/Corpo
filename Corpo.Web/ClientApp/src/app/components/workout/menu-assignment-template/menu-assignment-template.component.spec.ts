import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAssignmentTemplateComponent } from './menu-assignment-template.component';

describe('MenuAssignmentTemplateComponent', () => {
  let component: MenuAssignmentTemplateComponent;
  let fixture: ComponentFixture<MenuAssignmentTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAssignmentTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAssignmentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
