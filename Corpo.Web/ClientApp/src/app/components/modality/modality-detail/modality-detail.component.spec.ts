import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalityDetailComponent } from './modality-detail.component';

describe('ModalityDetailComponent', () => {
  let component: ModalityDetailComponent;
  let fixture: ComponentFixture<ModalityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
