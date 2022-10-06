import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from '../../../../domain/exercise';
import { ExerciseItem } from '../../../../domain/wod';
import { ExerciseService } from '../../../../services/exercise.service';

@Component({
  selector: 'app-emom',
  templateUrl: './emom.component.html',
  styleUrls: ['./emom.component.css']
})
export class EmomComponent implements OnInit {
  units = 0;
  intensity = 0;
  exercises: Exercise[] = [];
  exercisesSelect: Array<any> = [];
  selectedExercise: any;
  unitsTypes = [{ id: 1, type: 'metros' }, { id: 2, type: 'repeticiones' }];
  intensityTypes = [{ id: 1, type: 'kgs' }, { id: 2, type: '%' }, { id: 3, type: 'RPE' }, { id: 4, type: 'RPEs' }];
  selectedIntensityType: any;
  validatorsRequiredExercise: boolean;
  selectedUnitType: any;
  @Output() getExercise: EventEmitter<ExerciseItem> = new EventEmitter<ExerciseItem>();

  constructor(private exerciseService: ExerciseService) { }
  @Input() modeWodMember: boolean;

  ngOnInit() {
    this.getAllExercises();
  }

  getAllExercises() {
    this.exerciseService.getAll().subscribe(
      result => {
        console.log("ejercicios: ", result);
        this.exercises = result;
        this.exercisesSelect = this.exercises.map(x => ({ label: x.name, id: x.id }));
      },
      error => console.error(error)
    )
  }


  increaseUnit(i) {
    switch (i) {
      case 'units':
        this.units++;
        break;
      case 'intensity':
        this.intensity++;
        break;
      default:
    }
  }

  dencreaseUnit(i) {
    switch (i) {
      case 'units':
        this.units--;
        break;
      case 'intensity':
        this.intensity--;
        break;
      default:
    }
  }

  getEditExercise(exercise) {
    this.selectedExercise = exercise.exercise.id;
    console.log("ejercicio seleccionado para la edición: ", this.selectedExercise);
    this.units = exercise.units;
    this.selectedUnitType = this.unitsTypes.find(x => x.type == exercise.unitType);
    this.intensity = exercise.intensityValue;
    this.selectedIntensityType = this.intensityTypes.find(x => x.type == exercise.intensityType);
  }

  addExercise() {

    if (this.selectedExercise) {
      var exercise = this.exercises.find(x => x.id == this.selectedExercise);
      var exerciseItem = new ExerciseItem();
      exerciseItem.exercise = exercise;
      exerciseItem.unitType = this.selectedUnitType.type;
      exerciseItem.units = this.units.toString();
      if (this.selectedIntensityType == null) {
        exerciseItem.intensityType = "None";
      } else {
        exerciseItem.intensityType = this.selectedIntensityType.type;
      }

      exerciseItem.intensityValue = this.intensity;

      //this.wod.wodGroups[this.activeWodGroup].addExercise(exerciseItem);
      console.log("ejercicio: ", exerciseItem);
      this.getExercise.emit(exerciseItem);

      this.selectedExercise = undefined;
      this.selectedUnitType = undefined;
      this.units = 0;
      this.selectedIntensityType = undefined;
      this.intensity = 0;
    } else {
      if (!this.selectedExercise) {
        this.validatorsRequiredExercise = true;
      }
    }


  }

  clearData() {
    this.units = 0;
    this.intensity = 0;
    this.selectedExercise = undefined;
    this.selectedUnitType = undefined;
    this.selectedIntensityType = undefined;
  }
}
