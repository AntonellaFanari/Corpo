import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from '../../../../domain/exercise';
import { ExerciseItem, Wod } from '../../../../domain/wod';
import { Modality } from '../../../../domain/wod/modality';
import { ExerciseService } from '../../../../services/exercise.service';

@Component({
  selector: 'app-shortest-possible-time',
  templateUrl: './shortest-possible-time.component.html',
  styleUrls: ['./shortest-possible-time.component.css']
})
export class ShortestPossibleTimeComponent implements OnInit {
  rounds = 0;
  units = 0;
  intensity = 0;
  exercises: Exercise[] = [];
  exercisesSelect: Array<any> = [];
  selectedExercise: any;
  unitsTypes = [{ id: 1, type:'metros' }, { id: 2, type:'repeticiones' }];
  intensityTypes = [{ id: 1, type: 'kgs' }, { id: 2, type: '%' }, { id: 3, type: 'RPE' }, { id: 4, type: 'RPEs'}];
  modality: Modality;
  selectedIntensityType: any;
  validatorsRequiredExercise: boolean;
  selectedUnitType: any;
  @Output() getRounds: EventEmitter<number> = new EventEmitter<number>();
  @Output() getExercise: EventEmitter<ExerciseItem> = new EventEmitter<ExerciseItem>();


  constructor(private exerciseService: ExerciseService) { }

  @Input() modeWodMember: boolean;

  ngOnInit() {
    this.getAllExercises();
  }

  getEditExercise(exercise) {
    this.selectedExercise = exercise.exercise.id;
    console.log("ejercicio seleccionado para la edición: ", this.selectedExercise);
    this.units = exercise.units;
    this.selectedUnitType = this.unitsTypes.find(x => x.type == exercise.unitType);
    this.intensity = exercise.intensityValue;
    this.selectedIntensityType = this.intensityTypes.find(x => x.type == exercise.intensityType);
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
      case 'rounds':
        this.rounds++;
        this.getRounds.emit(this.rounds);
        break;
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
      case 'rounds':
        this.rounds--;
        this.getRounds.emit(this.rounds);
        break;
      case 'units':
        this.units--;
        break;
      case 'intensity':
        this.intensity--;
        break;
      default:
    }
  }

  selectExercise(id) {
    console.log("ejercicio: ", this.selectedExercise, id);
  }


  addExercise() {

    if (this.selectedExercise) {
      var exercise = this.exercises.find(x => x.id == this.selectedExercise);
      var exerciseItem = new ExerciseItem();
      exerciseItem.exercise = exercise;
      exerciseItem.modality = this.modality;
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
    this.rounds = 0;
    this.units = 0;
    this.intensity = 0;
    this.selectedExercise = undefined;
    this.selectedUnitType = undefined;
    this.selectedIntensityType = undefined;
  }


}
