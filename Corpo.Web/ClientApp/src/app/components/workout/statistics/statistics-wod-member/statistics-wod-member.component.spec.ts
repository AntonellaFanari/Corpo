import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsWodMemberComponent } from './statistics-wod-member.component';

describe('StatisticsWodMemberComponent', () => {
  let component: StatisticsWodMemberComponent;
  let fixture: ComponentFixture<StatisticsWodMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsWodMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsWodMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
