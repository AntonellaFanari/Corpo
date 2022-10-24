import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewWodComponent } from './preview-wod.component';

describe('PreviewWodComponent', () => {
  let component: PreviewWodComponent;
  let fixture: ComponentFixture<PreviewWodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewWodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewWodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
