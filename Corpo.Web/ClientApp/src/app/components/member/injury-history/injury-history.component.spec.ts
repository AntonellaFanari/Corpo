import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuryHistoryComponent } from './injury-history.component';

describe('InjuryHistoryComponent', () => {
  let component: InjuryHistoryComponent;
  let fixture: ComponentFixture<InjuryHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjuryHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjuryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
