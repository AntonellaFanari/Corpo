import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalityEditComponent } from './modality-edit.component';

describe('ModalityEditComponent', () => {
  let component: ModalityEditComponent;
  let fixture: ComponentFixture<ModalityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
