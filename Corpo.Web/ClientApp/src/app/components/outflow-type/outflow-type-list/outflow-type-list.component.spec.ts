import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutflowTypeListComponent } from './outflow-type-list.component';

describe('OutflowListComponent', () => {
  let component: OutflowTypeListComponent;
  let fixture: ComponentFixture<OutflowTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutflowTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutflowTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
