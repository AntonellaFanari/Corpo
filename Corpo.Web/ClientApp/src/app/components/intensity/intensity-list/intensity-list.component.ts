import { Component, OnInit } from '@angular/core';
import { Intensity } from '../../../domain/wod/intensity';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { IntensityService } from '../../../services/intensity.service';

@Component({
  selector: 'app-intensity-list',
  templateUrl: './intensity-list.component.html',
  styleUrls: ['./intensity-list.component.css']
})
export class IntensityListComponent implements OnInit {
  intensities: Intensity[] = [];
  filterIntensity = "";
  requestingList: boolean;

  constructor(private intensityService: IntensityService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.requestingList = true;
    this.getAll();
  }

  getAll() {
    this.intensityService.getAll().subscribe(
      response => {
        this.requestingList = false;
        console.log(response);
        this.intensities = response.result;
      },
      error => this.requestingList = false
    );
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Intensidades", ["¿Está seguro que desea eliminar esta intensidad?"], () => {
      this.intensityService.delete(id).subscribe(
        response => {
          this.getAll();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Intensidades", ["Error al intentar eliminar la intensidad."])
        })
    }, true)
  }
}
