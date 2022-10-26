import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTemplateCreateComponent } from './weekly-template-create.component';

describe('WeeklyTemplateCreateComponent', () => {
  let component: WeeklyTemplateCreateComponent;
  let fixture: ComponentFixture<WeeklyTemplateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyTemplateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyTemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
