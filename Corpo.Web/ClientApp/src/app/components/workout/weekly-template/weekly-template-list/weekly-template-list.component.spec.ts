import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTemplateListComponent } from './weekly-template-list.component';

describe('WeeklyTemplateListComponent', () => {
  let component: WeeklyTemplateListComponent;
  let fixture: ComponentFixture<WeeklyTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
