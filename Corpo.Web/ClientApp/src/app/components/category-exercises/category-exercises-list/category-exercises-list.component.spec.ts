import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryExercisesListComponent } from './category-exercises-list.component';

describe('CategoryExercisesListComponent', () => {
  let component: CategoryExercisesListComponent;
  let fixture: ComponentFixture<CategoryExercisesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryExercisesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryExercisesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
