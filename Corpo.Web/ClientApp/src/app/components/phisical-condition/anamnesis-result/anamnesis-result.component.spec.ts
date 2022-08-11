import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnamnesisResultComponent } from './anamnesis-result.component';

describe('AnamnesisResultComponent', () => {
  let component: AnamnesisResultComponent;
  let fixture: ComponentFixture<AnamnesisResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnamnesisResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnamnesisResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
