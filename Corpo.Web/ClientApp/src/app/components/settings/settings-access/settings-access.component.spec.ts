import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAccessComponent } from './settings-access.component';

describe('SettingsAccesComponent', () => {
  let component: SettingsAccessComponent;
  let fixture: ComponentFixture<SettingsAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
