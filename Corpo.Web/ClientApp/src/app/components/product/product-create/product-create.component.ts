import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ProductService } from '../../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  @ViewChild(ProductFormComponent, { static: false }) formProduct: ProductFormComponent;
  title = "Alta de Producto";
  constructor(private productService: ProductService, private customAlertService: CustomAlertService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    let newProduct = this.formProduct.createProduct();
    this.productService.add(newProduct).subscribe(
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
          this.customAlertService.displayAlert("Gestión de Productos", ["Hubo un problema al intentar cargar el producto."]);
        }
      })
  }

}
