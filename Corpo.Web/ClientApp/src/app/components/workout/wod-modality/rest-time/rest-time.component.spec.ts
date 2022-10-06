import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestTimeComponent } from './rest-time.component';

describe('RestTimeComponent', () => {
  let component: RestTimeComponent;
  let fixture: ComponentFixture<RestTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
