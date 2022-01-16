import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryExercisesCreateComponent } from './category-exercises-create.component';

describe('CategoryExercisesCreateComponent', () => {
  let component: CategoryExercisesCreateComponent;
  let fixture: ComponentFixture<CategoryExercisesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryExercisesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryExercisesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
