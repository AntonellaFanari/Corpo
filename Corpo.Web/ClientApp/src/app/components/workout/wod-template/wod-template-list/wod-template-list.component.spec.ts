import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WodTemplateListComponent } from './wod-template-list.component';

describe('WodTemplateListComponent', () => {
  let component: WodTemplateListComponent;
  let fixture: ComponentFixture<WodTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WodTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WodTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
