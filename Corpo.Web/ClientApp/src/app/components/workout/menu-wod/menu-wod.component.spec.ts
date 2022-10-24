import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWodComponent } from './menu-wod.component';

describe('MenuWodComponent', () => {
  let component: MenuWodComponent;
  let fixture: ComponentFixture<MenuWodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuWodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuWodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
