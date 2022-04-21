import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsPeriodizationComponent } from './statistics-periodization.component';

describe('StatisticsPeriodizationComponent', () => {
  let component: StatisticsPeriodizationComponent;
  let fixture: ComponentFixture<StatisticsPeriodizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsPeriodizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsPeriodizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
