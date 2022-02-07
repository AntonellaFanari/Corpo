import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WodTemplateFormComponent } from './wod-template-form.component';

describe('WodTemplateFormComponent', () => {
  let component: WodTemplateFormComponent;
  let fixture: ComponentFixture<WodTemplateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WodTemplateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WodTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
