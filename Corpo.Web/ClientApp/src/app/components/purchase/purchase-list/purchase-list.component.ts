import { Component, OnInit } from '@angular/core';
import { Purchase } from '../../../domain/purchase';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { PurchaseService } from '../../../services/purchase.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {
  purchases: Purchase[] = [];
  constructor(private purchaseService: PurchaseService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.purchaseService.getAll().subscribe(
      result => {
        console.log(result);
        this.purchases = result;
      },
      error => console.error(error)
    )
  }

  delete(id) {
    console.log("delete");
    this.customAlertService.displayAlert("Gestión de Compras", ["¿Está seguro que desea eliminar esta compra?"], () => {
      this.purchaseService.delete(id).subscribe(
        result => {
          console.log(result);
          this.getAll();
        },
        error => {
          console.log(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar la compra."]);
        })
    }, true);
  }

}
