import { Component, OnInit } from '@angular/core';
import { OutflowType } from '../../../domain/outflowType';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { OutflowService } from '../../../services/outflow.service';

@Component({
  selector: 'app-outflow-type-list',
  templateUrl: './outflow-type-list.component.html',
  styleUrls: ['./outflow-type-list.component.css']
})
export class OutflowTypeListComponent implements OnInit {
  filterOutflow = "";
  outflowType: OutflowType[] = [];

  constructor(private outflowService: OutflowService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.outflowService.getAllOutflowType().subscribe(
      result => {
        console.log(result);
        this.outflowType = result;
      },
      error => console.error(error)
    )
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Egresos", ["¿Está seguro que desea eliminar este egreso?"], () => {
      this.outflowService.deleteOutflowType(id).subscribe(
        result => {
          console.log(result);
          this.getAll();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Egresos", ["Error al intentar eliminar el egreso."])
        })
    })
  }

}
