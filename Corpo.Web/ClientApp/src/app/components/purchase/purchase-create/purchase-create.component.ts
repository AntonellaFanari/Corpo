import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DetailPurchase } from '../../../domain/detail-purchase';
import { Product } from '../../../domain/product';
import { Purchase } from '../../../domain/purchase';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ProductService } from '../../../services/product.service';
import { PurchaseService } from '../../../services/purchase.service';

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.css']
})
export class PurchaseCreateComponent implements OnInit {
  products: Product[] = [];
  purchase: Purchase;
  formDetailPurchase: FormGroup;
  selectedProduct: Product;
  filterProduct = '';
  detailPurchase: DetailPurchase[] = [];
  sendDetailPurchase: boolean = false;
  total = 0;
  supplier: string;
  userId: number;
  productCreate: boolean = false;

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private accountService: AccountService, private purchaseService: PurchaseService,
    private customAlertService: CustomAlertService, private router: Router) {
    this.userId = this.accountService.getLoggedUser().id;
    this.getFormDetailPurchase();
  }

  ngOnInit() {
    this.getAll();
    
  }

  getAll() {
    this.productService.getAll().subscribe(
      result => {
        console.log(result);
        this.products = result;
      },
      error => console.error(error)
    )
  }

  getFormDetailPurchase() {
    this.formDetailPurchase = this.formBuilder.group({
      supplier: ['', Validators.required],
      productId: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [0, Validators.required],
      cost: [0, Validators.required],
      total: 0
    })
  }

  get f() {
    return this.formDetailPurchase.controls;
  }


  getSupplier(event) {
    console.log(event);
    this.formDetailPurchase.patchValue({ supplier: event })
    this.supplier = event;
  }

  selectProduct(prod) {
    this.filterProduct = prod.description;
    this.selectedProduct = prod;
    this.formDetailPurchase.patchValue({ productId: prod.id, description: prod.description });
    let existProduct = this.detailPurchase.find(x => x.productId == prod.id);
    console.log(existProduct)
    if (existProduct) {
      this.formDetailPurchase.patchValue({
        productId: existProduct.productId,
        description: existProduct.description,
        quantity: existProduct.quantity,
        cost: existProduct.cost,
        total: (existProduct.quantity * existProduct.cost)
      });
    }
  }

  calculateTotal() {
    this.formDetailPurchase.patchValue({
      total: (this.formDetailPurchase.value.quantity * this.formDetailPurchase.value.cost)
    });
  }

  addDetailPurchase() {
    this.sendDetailPurchase = true;
    if (this.formDetailPurchase.valid) {
      let existProductIndex = this.detailPurchase.findIndex(x => x.productId == this.selectedProduct.id);
      if (existProductIndex != -1) {
        this.total = this.total - (this.detailPurchase[existProductIndex].quantity * this.detailPurchase[existProductIndex].cost);
        this.detailPurchase[existProductIndex].quantity = this.formDetailPurchase.value.quantity;
        this.detailPurchase[existProductIndex].cost = this.formDetailPurchase.value.cost;
        this.total = this.total + this.formDetailPurchase.value.total;
      } else {
        this.createDetailPurchase();
        this.total = this.total + this.formDetailPurchase.value.total;
      }
    }
  }

  createDetailPurchase() {
    let detail = new DetailPurchase();
    detail.productId = this.formDetailPurchase.value.productId;
    detail.description = this.formDetailPurchase.value.description;
    detail.quantity = this.formDetailPurchase.value.quantity;
    detail.cost = this.formDetailPurchase.value.cost;
    this.detailPurchase.push(detail);
    console.log(this.detailPurchase);
  }

  cleanForm() {
    this.sendDetailPurchase = false;
    this.getFormDetailPurchase();
    this.formDetailPurchase.patchValue({ supplier: this.supplier });
    this.filterProduct = '';
  }

  removeList(i) {
    console.log(i);
    let totalProduct = this.detailPurchase[i].cost * this.detailPurchase[i].quantity;
    this.total = this.total - totalProduct;
    this.detailPurchase.splice(i, 1);
  }

  createPurchase() {
    let newPurchase = new Purchase();
    newPurchase.userId = this.userId;
    newPurchase.supplier = this.formDetailPurchase.value.supplier;
    newPurchase.total = this.total;
    newPurchase.detailPurchase = this.detailPurchase;
    console.log(newPurchase);
    return newPurchase;
  }

  submit() {
    if (this.detailPurchase.length > 0) {
      let newPurchase = this.createPurchase();
      console.log(newPurchase);
      this.purchaseService.add(newPurchase).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/compras-list']);
        }, error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Compras", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Compras", ["Hubo un problema al intentar cargar la compra."]);
          }
        });
    } else {
      this.customAlertService.displayAlert("Gestión de Compras", ["No se seleccionaron productos."]);
    }

  }

  viewProductCreate(event) {
    this.productCreate = event;
    this.getAll();
  }
}
