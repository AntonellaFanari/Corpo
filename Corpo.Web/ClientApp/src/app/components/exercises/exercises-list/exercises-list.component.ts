import { Component, OnInit } from '@angular/core';
import { Exercise } from '../../../domain/exercise';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ExerciseService } from '../../../services/exercise.service';
@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.css']
})
export class ExercisesListComponent implements OnInit {
  filterExercise = "";
  exercises: Exercise[] = [];
  requestingList: boolean;

  constructor(private exerciseService: ExerciseService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.requestingList = true;
    this.getAll();
  }

  getAll() {
    this.exerciseService.getAll().subscribe(
      result => {
        this.requestingList = false;
        this.exercises = result;
      },
      error => this.requestingList = false
    )
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Ejercicios", ["¿Está seguro que desea eliminar este ejercicio?"], () => {
      this.requestingList = true;
      this.exerciseService.deleteExercise(id).subscribe(
        result => {
          this.getAll();
        },
        error => {
          this.requestingList = false;
          console.error(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar el ejercicio."]);
        })
    }, true);
  }

}
