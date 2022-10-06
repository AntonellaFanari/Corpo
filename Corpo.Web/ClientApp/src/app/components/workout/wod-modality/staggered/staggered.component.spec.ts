import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaggeredComponent } from './staggered.component';

describe('StaggeredComponent', () => {
  let component: StaggeredComponent;
  let fixture: ComponentFixture<StaggeredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaggeredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaggeredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
