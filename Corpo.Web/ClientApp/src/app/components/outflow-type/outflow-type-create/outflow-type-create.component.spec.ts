import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutflowTypeCreateComponent } from './outflow-type-create.component';

describe('OutflowTypeCreateComponent', () => {
  let component: OutflowTypeCreateComponent;
  let fixture: ComponentFixture<OutflowTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutflowTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutflowTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
