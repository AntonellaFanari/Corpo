import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Class } from '../../../domain/class';
import { ClassService } from '../../../services/class.service';
import { CustomAlertService } from '../../../services/custom-alert.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  classes: Class[] = [];
  filterName = "";
  requestingList: boolean;

  constructor(private classService: ClassService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.requestingList = true;
    this.getAll();
  }

  getAll() {
    this.classService.getAll().subscribe(
      result => {
        this.requestingList = false;
        for (var i = 0; i < result.length; i++) {
          if (result[i].personalized == "yes") {
            result[i].personalized = "Si"
          } else {
            result[i].personalized = "No";
          }
        }
        this.classes = result;
      },
      error => this.requestingList = false
    );
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Clases", ["¿Está seguro que desea eliminar esta clase?"], () => {
      this.requestingList = true;
      this.classService.delete(id).subscribe(
        result => {
          this.getAll();
        },
        error => {
          this.requestingList = false;
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Clases", ["Error al intentar eliminar la clase."])
        })
    }, true)
  }
}
