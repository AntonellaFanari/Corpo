import { Component, OnInit } from '@angular/core';
import { CategoryExercises } from '../../../domain/category-exercises';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ExerciseService } from '../../../services/exercise.service';

@Component({
  selector: 'app-category-exercises-list',
  templateUrl: './category-exercises-list.component.html',
  styleUrls: ['./category-exercises-list.component.css']
})
export class CategoryExercisesListComponent implements OnInit {
  filterName = "";
  categories: CategoryExercises[] = [];

  constructor(private exerciseService: ExerciseService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.exerciseService.getAllCategories().subscribe(
      result => {
        console.log(result);
        this.categories = result;
      },
      error => console.error(error)
    )
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Categorias", ["¿Está seguro que desea eliminar esta categoria?"], () => {
      this.exerciseService.deleteCategory(id).subscribe(
        result => {
          this.getAll();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar la categoria."]);
        })
    }, true);
  }

}
