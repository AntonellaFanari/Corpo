import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from '../../../../domain/exercise';
import { ExerciseItem } from '../../../../domain/wod';
import { ExerciseService } from '../../../../services/exercise.service';

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.css']
})
export class TimersComponent implements OnInit {
  rounds = 0;
  units = 0;
  intensity = 0;
  exercises: Exercise[] = [];
  exercisesSelect: Array<any> = [];
  selectedExercise: any;
  unitsTypes = [{ id: 1, type: 'metros' }, { id: 2, type: 'repeticiones' }];
  intensityTypes = [{ id: 1, type: 'kgs' }, { id: 2, type: '%' }, { id: 3, type: 'RPE' }, { id: 4, type: 'RPEs' }];
  timeWork = 0;
  timeRest = 0;
  selectedIntensityType: any;
  @Output() getRounds: EventEmitter<number> = new EventEmitter<number>();
  @Output() getExercise: EventEmitter<ExerciseItem> = new EventEmitter<ExerciseItem>();
  validatorsRequiredExercise: boolean;
  selectedUnitType: any;


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
      case 'rounds':
        this.rounds++;
        this.getRounds.emit(this.rounds);
        break;
      case 'timeWork':
        this.timeWork++;
        break;
      case 'timeRest':
        this.timeRest++;
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
      case 'timeWork':
        this.timeWork--;
        break;
      case 'timeRest':
        this.timeRest--;
        break;
      case 'intensity':
        this.intensity--;
        break;
      default:
    }
  }

  addExercise() {

    if (this.selectedExercise) {
      var exercise = this.exercises.find(x => x.id == this.selectedExercise);
      var exerciseItem = new ExerciseItem();
      exerciseItem.exercise = exercise;
      exerciseItem.timeWork = this.timeWork;
      exerciseItem.timeRest = this.timeRest;
      exerciseItem.unitType = this.selectedUnitType.type;
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
      this.selectedIntensityType = undefined;
      this.selectedUnitType = undefined;
      this.units = 0;
      this.intensity = 0;
      this.timeWork = 0;
      this.timeRest = 0;
    } else {
      if (!this.selectedExercise) {
        this.validatorsRequiredExercise = true;
      }
    }


  }

  getEditExercise(exercise) {
    this.selectedExercise = exercise.exercise.id;
    this.selectedUnitType = this.unitsTypes.find(x => x.type == exercise.unitType);
    console.log("ejercicio seleccionado para la edición: ", this.selectedExercise);
    this.intensity = exercise.intensityValue;
    this.selectedIntensityType = this.intensityTypes.find(x => x.type == exercise.intensityType);
    this.timeWork = exercise.timeWork;
    this.timeRest = exercise.timeRest;
  }

  clearData() {
    this.rounds = 0;
    this.intensity = 0;
    this.selectedExercise = undefined;
    this.selectedIntensityType = undefined;
    this.timeWork = 0;
    this.timeRest = 0;
  }

  setRounds() {
    this.getRounds.emit(this.rounds);
  }

}
