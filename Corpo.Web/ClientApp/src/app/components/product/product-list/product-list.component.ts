import { Component, OnInit } from '@angular/core';
import { Product } from '../../../domain/product';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filterProduct = "";
  requestingList: boolean;

  constructor(private productService: ProductService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.requestingList = true;
    this.getAll();
  }

  getAll() {
    this.productService.getAll().subscribe(
      result => {
        this.requestingList = false;
        this.products = result;
      },
      error => this.requestingList = false
    )
  }

   delete(id) {
    console.log("delete");
     this.customAlertService.displayAlert("Gestión de Productos", ["¿Está seguro que desea eliminar este producto?"], () => {
       this.requestingList = true;
      this.productService.delete(id).subscribe(
        result => {
          console.log(result);
          this.getAll();
        },
        error => {
          this.requestingList = false;
          console.log(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar el producto."]);
        })
    }, true);
  }
}
