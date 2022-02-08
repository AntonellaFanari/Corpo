import { Component, OnInit } from '@angular/core';
import { Modality } from '../../../domain/wod/modality';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ModalityService } from '../../../services/modality.service';

@Component({
  selector: 'app-modality-list',
  templateUrl: './modality-list.component.html',
  styleUrls: ['./modality-list.component.css']
})
export class ModalityListComponent implements OnInit {
  modalities: Modality[] = [];
  filterName = "";

  constructor(private modalityService: ModalityService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.modalityService.getAll().subscribe(
      response => {
        console.log(response);
        this.modalities = response.result;
      },
      error => console.error(error)
    );
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Modalidades", ["¿Está seguro que desea eliminar esta modalidad?"], () => {
      this.modalityService.delete(id).subscribe(
        result => {
          console.log(result);
          this.getAll();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Modalidades", ["Error al intentar eliminar la modalidad."])
        })
    })
  }
}
