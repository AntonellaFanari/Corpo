import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeePromotionComponent } from './fee-promotion.component';

describe('FeePromotionComponent', () => {
  let component: FeePromotionComponent;
  let fixture: ComponentFixture<FeePromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeePromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
