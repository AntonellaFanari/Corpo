import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutflowCreateComponent } from './outflow-create.component';

describe('OutflowCreateComponent', () => {
  let component: OutflowCreateComponent;
  let fixture: ComponentFixture<OutflowCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutflowCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutflowCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
