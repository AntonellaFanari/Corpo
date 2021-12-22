import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutflowDetailComponent } from './outflow-detail.component';

describe('OutflowDetailComponent', () => {
  let component: OutflowDetailComponent;
  let fixture: ComponentFixture<OutflowDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutflowDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutflowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
