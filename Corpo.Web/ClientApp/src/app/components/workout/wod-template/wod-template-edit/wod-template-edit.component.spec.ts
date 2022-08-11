import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WodTemplateEditComponent } from './wod-template-edit.component';

describe('WodTemplateEditComponent', () => {
  let component: WodTemplateEditComponent;
  let fixture: ComponentFixture<WodTemplateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WodTemplateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WodTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
