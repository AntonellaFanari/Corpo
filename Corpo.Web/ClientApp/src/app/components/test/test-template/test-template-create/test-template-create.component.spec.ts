import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTemplateCreateComponent } from './test-template-create.component';

describe('TestTemplateCreateComponent', () => {
  let component: TestTemplateCreateComponent;
  let fixture: ComponentFixture<TestTemplateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTemplateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
