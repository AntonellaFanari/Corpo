import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmomComponent } from './emom.component';

describe('EmomComponent', () => {
  let component: EmomComponent;
  let fixture: ComponentFixture<EmomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
