import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutflowComponent } from './outflow.component';

describe('OutflowComponent', () => {
  let component: OutflowComponent;
  let fixture: ComponentFixture<OutflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
