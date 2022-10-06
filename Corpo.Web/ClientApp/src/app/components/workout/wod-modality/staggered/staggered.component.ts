import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from '../../../../domain/exercise';
import { ExerciseItem } from '../../../../domain/wod';
import { ExerciseService } from '../../../../services/exercise.service';

@Component({
  selector: 'app-staggered',
  templateUrl: './staggered.component.html',
  styleUrls: ['./staggered.component.css']
})
export class StaggeredComponent implements OnInit {
  nSeries = 3;
  units = [0, 0];
  intensity = 0;
  exercises: Exercise[] = [];
  exercisesSelect: Array<any> = [];
  selectedExercise: any;
  staggeredValue = 3;
  selectedStaggeredType = 1;
  baseUnit = 0;
  unitsTypes = [{ id: 1, type: 'metros' }, { id: 2, type: 'repeticiones' }];
  intensityTypes = [{ id: 1, type: 'kgs' }, { id: 2, type: '%' }, { id: 3, type: 'RPE' }, { id: 4, type: 'RPEs' }];
  staggeredTypes = [{ id: 1, type: "Ascendente" }, { id: 2, type: "Descendente" }, { id: 3, type: "Igual" }];
  validatorsRequiredExercise: boolean;
  selectedUnitType: any;
  selectedIntensityType: any;
  @Output() getDetail: EventEmitter<{}> = new EventEmitter<{}>();
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
      case 'series':
        this.nSeries++;
        this.getDetailGroup();
        this.units = [];
        for (var j = 0; j < this.nSeries-1; j++) {
          this.units.push(0);
        };
        break;
      case 'staggered':
        if (this.selectedStaggeredType != 3)
        this.staggeredValue++;
        this.getDetailGroup();
        break;
      case 'intensity':
        this.intensity++;
        break;
      default:
    }
  }

  dencreaseUnit(i) {
    switch (i) {
      case 'series':
        this.nSeries--;
        this.getDetailGroup();
        this.units = [];
        for (var j = 0; j < this.nSeries-2; j++) {
          this.units.push(0);
        };
        break;
      case 'staggered':
        if(this.selectedStaggeredType != 3)
        this.staggeredValue++;
        this.getDetailGroup();
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
    this.units = exercise.units.split('-');
    this.baseUnit = this.units[0];
    this.units.splice(0, 1);
    this.selectedUnitType = this.unitsTypes.find(x => x.type == exercise.unitType);
    this.intensity = exercise.intensityValue;
    this.selectedIntensityType = this.intensityTypes.find(x => x.type == exercise.intensityType);

  }

  getDetailGroup() {
    let staggeredType = this.staggeredTypes.find(x => x.id == this.selectedStaggeredType).type;
    let detail = { nSeries: this.nSeries, staggeredType: staggeredType, staggeredValue: this.staggeredValue };
    this.getDetail.emit(detail);
  }

  calculateUnits() {
    if (this.selectedStaggeredType == 1) {

      for (var i = 0; i < this.units.length; i++) {
        this.units[i] = this.baseUnit + (this.staggeredValue * (i + 1));
      }
    } else if (this.selectedStaggeredType == 2) {
      for (var i = 0; i < this.units.length; i++) {
        this.units[i] = this.baseUnit - (this.staggeredValue * (i + 1));
      }
    } else if (this.selectedStaggeredType == 3) {
      for (var i = 0; i < this.units.length; i++) {
        this.units[i] = this.baseUnit;
      }
    }

  }

  selectStaggeredType() {
    if (this.selectedStaggeredType == 3) this.staggeredValue = 0;
    this.getDetailGroup();
  }

  addExercise() {

    if (this.selectedExercise) {
      var exercise = this.exercises.find(x => x.id == this.selectedExercise);
      var exerciseItem = new ExerciseItem();
      exerciseItem.exercise = exercise;
      exerciseItem.unitType = this.selectedUnitType.type;
      this.units.unshift(this.baseUnit);
      exerciseItem.units = this.units.toString().replace(/,/g, '-')
      if (this.selectedIntensityType == null) {
        exerciseItem.intensityType = "None";
      } else {
        exerciseItem.intensityType = this.selectedIntensityType.type;
      }

      exerciseItem.intensityValue = this.intensity;

      //this.wod.wodGroups[this.activeWodGroup].addExercise(exerciseItem);
      console.log("ejercicio: ", exerciseItem);
      this.getExercise.emit(exerciseItem);
      this.getDetailGroup();

      this.selectedExercise = undefined;
      this.selectedUnitType = undefined;
      this.units = [];
      for (var i = 0; i < this.nSeries-1; i++) {
        this.units.push(0)
      };
      this.selectedIntensityType = undefined;
      this.intensity = 0;
      this.baseUnit = 0;
    } else {
      if (!this.selectedExercise) {
        this.validatorsRequiredExercise = true;
      }
    }


  }

  clearData() {
    this.nSeries = 3;
    this.selectedStaggeredType = 1;
    this.staggeredValue = 3;
    this.units = [0, 0];
    this.intensity = 0;
    this.selectedExercise = undefined;
    this.selectedUnitType = undefined;
    this.selectedIntensityType = undefined;
    this.baseUnit = 0;
  }


}
