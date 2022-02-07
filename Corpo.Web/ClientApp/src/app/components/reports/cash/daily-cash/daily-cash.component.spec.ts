import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCashComponent } from './daily-cash.component';

describe('DailyCashComponent', () => {
  let component: DailyCashComponent;
  let fixture: ComponentFixture<DailyCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
