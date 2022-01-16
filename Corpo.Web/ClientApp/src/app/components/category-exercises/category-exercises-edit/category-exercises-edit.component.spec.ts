import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryExercisesEditComponent } from './category-exercises-edit.component';

describe('CategoryExercisesEditComponent', () => {
  let component: CategoryExercisesEditComponent;
  let fixture: ComponentFixture<CategoryExercisesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryExercisesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryExercisesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
