import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntensityListComponent } from './intensity-list.component';

describe('IntensityListComponent', () => {
  let component: IntensityListComponent;
  let fixture: ComponentFixture<IntensityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntensityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntensityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
