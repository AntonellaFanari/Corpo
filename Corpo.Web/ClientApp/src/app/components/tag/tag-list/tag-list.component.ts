import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../domain/tag';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ExerciseService } from '../../../services/exercise.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {
  filterName = "";
  tags: Tag[] = [];
  requestingList: boolean;

  constructor(private exerciseService: ExerciseService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.requestingList = true;
    this.getAll();
  }

  getAll() {
    this.exerciseService.getAllTags().subscribe(
      result => {
        this.requestingList = false;
        this.tags = result;
      },
      error => this.requestingList = false
    )
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Tags", ["¿Está seguro que desea eliminar este tag?"], () => {
      this.requestingList = true;
      this.exerciseService.deleteTag(id).subscribe(
        result => {
          this.getAll();
        },
        error => {
          this.requestingList = false;
          console.error(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar el tag."]);
        })
    }, true);
  }


}
