import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortestPossibleTimeComponent } from './shortest-possible-time.component';

describe('ShortestPossibleTimeComponent', () => {
  let component: ShortestPossibleTimeComponent;
  let fixture: ComponentFixture<ShortestPossibleTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortestPossibleTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortestPossibleTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
