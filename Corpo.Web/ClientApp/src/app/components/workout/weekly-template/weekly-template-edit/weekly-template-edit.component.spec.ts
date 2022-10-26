import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTemplateEditComponent } from './weekly-template-edit.component';

describe('WeeklyTemplateEditComponent', () => {
  let component: WeeklyTemplateEditComponent;
  let fixture: ComponentFixture<WeeklyTemplateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyTemplateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
