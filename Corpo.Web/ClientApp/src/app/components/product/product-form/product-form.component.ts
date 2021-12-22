import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../domain/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  formProduct: FormGroup;
  sent: boolean = false;
  product: Product;
  @Input() title: string = "Modificación de Producto";

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
    this.formProduct = this.formBuilder.group({
      description: ['', Validators.required],
      stock: 0,
      price: [0, Validators.required]
    });
  }
  
  ngOnInit() {
    if (this.title == "Alta de Producto") {
      let inputStock = document.getElementById("input-stock");
      inputStock.setAttribute('readonly', 'true');
      console.log(inputStock);
    }

  }
  get f() {
    return this.formProduct.controls;
  }

  createProduct() {
    let newProduct = new Product();
    newProduct.description = this.formProduct.value.description;
    newProduct.stock = this.formProduct.value.quantity;
    newProduct.price = this.formProduct.value.price;
    return newProduct;
  }

  getProductUpdate(id) {
    this.productService.getById(id).subscribe(
      result => {
        this.product = result;
        console.log(this.product);
        this.toCompleteForm();
      },
      error => console.error(error)
    )
  }

  toCompleteForm() {
    this.formProduct.patchValue({
      description: this.product.description,
      stock: this.product.stock,
      price: this.product.price
    })
  }

}
