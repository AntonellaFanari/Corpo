import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutflowTypeEditComponent } from './outflow-type-edit.component';

describe('OutflowEditComponent', () => {
  let component: OutflowTypeEditComponent;
  let fixture: ComponentFixture<OutflowTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutflowTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutflowTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
