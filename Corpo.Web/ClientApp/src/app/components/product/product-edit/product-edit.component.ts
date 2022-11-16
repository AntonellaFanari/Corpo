import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ProductService } from '../../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id: number;
  @ViewChild(ProductFormComponent, { static: true }) formProduct: ProductFormComponent;
  requesting = false;
/*  title = "Modificación de Producto";*/

  constructor(private productService: ProductService, private customAlertService: CustomAlertService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id'])
    });
  }

  ngOnInit() {
    this.requesting = true;
    this.formProduct.getProductUpdate(this.id);
  }

  getRequesting() {
    this.requesting = false;
  }

  submit() {
    let productUpdate = this.formProduct.createProduct();
    this.productService.update(this.id, productUpdate).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/productos-list'])
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de Productos", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de Productos", ["Hubo un problema al intentar modificar el producto."]);
        }
      })
  }

}
