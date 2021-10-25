import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAccesComponent } from './settings-acces.component';

describe('SettingsAccesComponent', () => {
  let component: SettingsAccesComponent;
  let fixture: ComponentFixture<SettingsAccesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAccesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
