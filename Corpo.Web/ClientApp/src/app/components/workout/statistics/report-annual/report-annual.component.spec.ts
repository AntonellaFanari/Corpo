import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAnnualComponent } from './report-annual.component';

describe('ReportAnnualComponent', () => {
  let component: ReportAnnualComponent;
  let fixture: ComponentFixture<ReportAnnualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAnnualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAnnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
