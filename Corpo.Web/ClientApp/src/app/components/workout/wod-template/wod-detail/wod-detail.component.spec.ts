import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WodDetailComponent } from './wod-detail.component';

describe('WodDetailComponent', () => {
  let component: WodDetailComponent;
  let fixture: ComponentFixture<WodDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WodDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WodDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
