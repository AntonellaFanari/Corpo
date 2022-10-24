import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultWodComponent } from './result-wod.component';

describe('ResultWodComponent', () => {
  let component: ResultWodComponent;
  let fixture: ComponentFixture<ResultWodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultWodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultWodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
