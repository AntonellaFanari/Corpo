import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentedStatisticsComponent } from './segmented-statistics.component';

describe('SegmentedStatisticsComponent', () => {
  let component: SegmentedStatisticsComponent;
  let fixture: ComponentFixture<SegmentedStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentedStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentedStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
