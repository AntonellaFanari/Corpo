import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmrapComponent } from './amrap.component';

describe('AmrapComponent', () => {
  let component: AmrapComponent;
  let fixture: ComponentFixture<AmrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
