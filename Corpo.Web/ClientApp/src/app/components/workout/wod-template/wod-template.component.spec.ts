import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WodTemplateComponent } from './wod-template.component';

describe('WodTemplateComponent', () => {
  let component: WodTemplateComponent;
  let fixture: ComponentFixture<WodTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WodTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WodTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
