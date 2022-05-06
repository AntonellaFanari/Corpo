import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTemplateEditComponent } from './test-template-edit.component';

describe('TestTemplateEditComponent', () => {
  let component: TestTemplateEditComponent;
  let fixture: ComponentFixture<TestTemplateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTemplateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
