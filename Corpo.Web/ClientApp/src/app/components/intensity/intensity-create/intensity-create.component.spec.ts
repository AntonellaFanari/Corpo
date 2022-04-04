import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntensityCreateComponent } from './intensity-create.component';

describe('IntensityCreateComponent', () => {
  let component: IntensityCreateComponent;
  let fixture: ComponentFixture<IntensityCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntensityCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntensityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
