import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberReportListComponent } from './member-report-list.component';

describe('MemberReportListComponent', () => {
  let component: MemberReportListComponent;
  let fixture: ComponentFixture<MemberReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
