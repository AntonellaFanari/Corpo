import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCreateComponent } from './fee-create.component';

describe('FeeCreateComponent', () => {
  let component: FeeCreateComponent;
  let fixture: ComponentFixture<FeeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
