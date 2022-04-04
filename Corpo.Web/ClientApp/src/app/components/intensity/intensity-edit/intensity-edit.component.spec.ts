import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntensityEditComponent } from './intensity-edit.component';

describe('IntensityEditComponent', () => {
  let component: IntensityEditComponent;
  let fixture: ComponentFixture<IntensityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntensityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntensityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
