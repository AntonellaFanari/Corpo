import { Component, OnInit } from '@angular/core';
import { Promotion } from '../../../domain/promotion';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { PromotionService } from '../../../services/promotion.service';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.css']
})
export class PromotionListComponent implements OnInit {
  promotions: Promotion[] = [];
  filterName = "";
  requestingList: boolean;

  constructor(private promotionService: PromotionService,
    private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.requestingList = true;
    this.getAll();
  }

  getAll() {
    this.promotionService.getAll().subscribe(
      result => {
        this.requestingList = false;
        this.promotions = result;
      },
      error => this.requestingList = false
    )
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Promociones", ["¿Está seguro que desea eliminar esta promoción?"], () => {
      this.requestingList = true;
      this.promotionService.delete(id).subscribe(
        result => {
          console.log(result);
          this.getAll();
        },
        error => {
          this.requestingList = false;
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Promociones", ["Error al intentar eliminar la promoción."])
        })
    }, true)
  }
}
