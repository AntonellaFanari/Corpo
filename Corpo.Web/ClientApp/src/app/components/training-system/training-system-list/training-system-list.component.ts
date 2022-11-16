import { Component, OnInit } from '@angular/core';
import { TrainingSystem } from '../../../domain/wod/training-system';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { TrainingSystemService } from '../../../services/wod/training-system.service';

@Component({
  selector: 'app-training-system-list',
  templateUrl: './training-system-list.component.html',
  styleUrls: ['./training-system-list.component.css']
})
export class TrainingSystemListComponent implements OnInit {
  trainingSystems: TrainingSystem[] = [];
  filterTrainingSystem = "";
  requestingList: boolean;

  constructor(private trainingSystemService: TrainingSystemService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.requestingList = true;
    this.trainingSystemService.getAll().subscribe(
      response => {
        this.requestingList = false;
        console.log(response);
        this.trainingSystems = response.result;
      },
      error => this.requestingList = false
    );
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Sistemas de Entrenamiento", ["¿Está seguro que desea eliminar este sistema de entrenamiento?"], () => {
      this.requestingList = true;
      this.trainingSystemService.delete(id).subscribe(
        response => {
          this.getAll();
        },
        error => {
          this.requestingList = false;
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Sistemas de Entrenamiento", ["Error al intentar eliminar el sistema de entrenamiento."])
        })
    }, true)
  }

}
