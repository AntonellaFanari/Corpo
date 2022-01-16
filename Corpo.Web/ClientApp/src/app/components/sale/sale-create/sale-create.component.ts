import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BalanceToPay, TransactionType } from '../../../domain/balance-to-pay';
import { DetailsSale } from '../../../domain/details-sale';
import { MemberView } from '../../../domain/member-view';
import { Product } from '../../../domain/product';
import { Sale } from '../../../domain/sale';
import { SaleDto } from '../../../domain/sale-dto';
import { Status } from '../../../domain/status';
import { AccountService } from '../../../services/account.service';
import { BalanceService } from '../../../services/balance.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MemberService } from '../../../services/member.service';
import { ProductService } from '../../../services/product.service';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.css']
})
export class SaleCreateComponent implements OnInit {
  members: MemberView[] = [];
  view: boolean = false;
  products: Product[] = [];
  filterMember: string = '';
  filterProduct: string = '';
  formDetailsSale: FormGroup;
  userId: number;
  currentDate: string;
  selectedMember: MemberView;
  selectedProduct: Product;
  descriptionProduct: string;
  sale: Sale;
  detailsSale: DetailsSale[] = [];
  total = 0;
  viewListDetails: boolean = false;
  sendDetailSale: boolean = false;
  memberRequired: boolean = false;
  pay = 0;
  //positiveBalance = 0;
  //positiveBalanceSaleDto = 0;

  constructor(private memberService: MemberService, private productService: ProductService, private formBuilder: FormBuilder,
    private accountService: AccountService, private dp: DatePipe, private saleService: SaleService, private router: Router,
    private customAlertService: CustomAlertService, private balanceService: BalanceService) {
    this.userId = this.accountService.getLoggedUser().id;
    this.getFormDetailsSale();
  }

  ngOnInit() {
    this.currentDate = this.dp.transform(new Date(), 'yyyy-MM-dd');
    this.memberService.getAll().subscribe(
      result => {
        console.log(result);
        this.members = result;
      },
      error => console.log(error)
    );

    this.productService.getAll().subscribe(
      result => {
        console.log(result);
        this.products = result;
      },
      error => console.error(error)
    );
  }

  //getPositiveBalance(id) {
  //  this.balanceService.getPositiveBalanceByIdMember(id).subscribe(
  //    result => {
  //      console.log(result);
  //      if (result.resul != null) {
  //        this.positiveBalance = result.result.balance * (-1);
  //      } else {
  //        this.positiveBalance = 0;
  //      }
       
  //    },
  //    error => console.error(error)
  //  )
  //}

  getFormDetailsSale() {
    return this.formDetailsSale = this.formBuilder.group({
      memberName: ['', Validators.required],
      idProduct: '',
      description: ['', Validators.required],
      quantity: [0, Validators.min(1)],
      price: 0,
      total: 0
    })
  }

  get f() {
    return this.formDetailsSale.controls;
  }

  listOpen() {
    this.view = !this.view;
  }

  selectMember(member) {
    this.selectedMember = member;
    this.filterMember = member.lastName + " " + member.name;
    this.formDetailsSale.patchValue({ memberName: member.lastName + " " + member.name });
  /*  this.getPositiveBalance(member.id);*/
  }

  selectProduct(prod) {
    console.log(prod);
    this.filterProduct = prod.description;
    if (prod.stock > 0) {
      this.selectedProduct = prod;
      this.formDetailsSale.patchValue({ description: prod.description });
      console.log(this.formDetailsSale.value.description);
      let existProduct = this.detailsSale.find(x => x.productId == prod.id);
      if (existProduct) {
        this.formDetailsSale.patchValue({
          quantity: existProduct.quantity,
          price: this.selectedProduct.price,
          total: (existProduct.quantity * existProduct.price)
        })
      } else {
        this.formDetailsSale.patchValue({
          price: this.selectedProduct.price
        })
      }
    } else {
      this.customAlertService.displayAlert("Gestión de Ventas", ["Producto sin stock."]);
    }

  }

  calculateTotal() {
    if (this.selectedProduct.stock) {
      this.formDetailsSale.patchValue({
        total: (this.formDetailsSale.value.quantity * this.selectedProduct.price)
      });
    } else {
      this.formDetailsSale.patchValue({
        total: 0
      });
    }
  }

  //getErrorMemberRequired() {
  //  if (this.selectedMember != undefined) {
  //    this.memberRequired = false;
  //  } else {
  //    this.memberRequired = true;
  //  }
  //}

  addDetailSale() {
    this.sendDetailSale = true;
    /*   this.getErrorMemberRequired();*/
    if (this.formDetailsSale.valid) {
      let existProductIndex = this.detailsSale.findIndex(x => x.productId == this.selectedProduct.id);
      if (existProductIndex != -1) {
        let product = this.detailsSale[existProductIndex];
        let totalProduct = product.quantity * product.price;
        let currentStock = this.selectedProduct.stock - product.quantity;
        let currentquantity = this.formDetailsSale.value.quantity;
        if (currentStock > 0 && currentquantity <= currentStock) {
          currentquantity = currentStock + product.quantity;
          this.detailsSale.splice(existProductIndex, 1);
          this.createDetailSale();
          this.total = this.total - totalProduct + (this.formDetailsSale.value.quantity * this.formDetailsSale.value.price);
          this.pay = this.total;
        //  if (this.positiveBalance > this.total) {
        //    this.positiveBalanceSaleDto = this.positiveBalance - this.total;
        //    this.pay = 0
        //  } if (this.positiveBalance == this.total) {
        //    this.positiveBalanceSaleDto = 0;
        //    this.pay = 0
        //  }
        //  else {
        //    this.positiveBalanceSaleDto = this.positiveBalance;
        //    this.pay = this.total - this.positiveBalance;
        //  }
        }
        else {
          this.customAlertService.displayAlert("Gestión de Ventas", ["La cantidad seleccionada supera el stock disponible."]);
          currentquantity = currentStock + product.quantity;
          this.formDetailsSale.patchValue({
            quantity: currentquantity,
            price: this.selectedProduct.price,
            total: (currentquantity * this.selectedProduct.price)
          });
          this.detailsSale.splice(existProductIndex, 1);
          this.total = this.total - totalProduct;

          //if (this.positiveBalance > this.total) {
          //  this.positiveBalanceSaleDto = this.positiveBalance - this.total;
          //  this.pay = 0
          //} if (this.positiveBalance == this.total) {
          //  this.positiveBalanceSaleDto = 0;
          //  this.pay = 0
          //}
          //else {
          //  this.positiveBalanceSaleDto = this.positiveBalance;
          //  this.pay = this.total - this.positiveBalance;
          //}
          this.pay = this.total;
        }
      } else {
        this.createDetailSale();
        this.total = this.total + (this.formDetailsSale.value.quantity * this.formDetailsSale.value.price);
        this.pay = this.total;
        //if (this.positiveBalance > this.total) {
        //  this.positiveBalanceSaleDto = this.positiveBalance - this.total;
        //  this.pay = 0
        //} if (this.positiveBalance == this.total) {
        //  this.positiveBalanceSaleDto = 0;
        //  this.pay = 0
        //}
        //else {
        //  this.positiveBalanceSaleDto = this.positiveBalance;
        //  this.pay = this.total - this.positiveBalance;
        //}
      }
    }
  }

  createDetailSale() {
    let newDetailsSale = new DetailsSale();
    newDetailsSale.description = this.formDetailsSale.value.description;;
    newDetailsSale.productId = this.selectedProduct.id;
    newDetailsSale.quantity = this.formDetailsSale.value.quantity;
    newDetailsSale.price = this.formDetailsSale.value.price;
    this.detailsSale.push(newDetailsSale);
    console.log(this.detailsSale);
  }

  cleanForm() {
    this.sendDetailSale = false;
    this.getFormDetailsSale();
    this.formDetailsSale.patchValue({ memberName: this.selectedMember.lastName + " " + this.selectedMember.name });
    this.filterProduct = '';
  }

  removeList(i) {
    console.log(i);
    this.detailsSale.splice(i, 1);
  }

  createSale() {
    let newSale = new SaleDto();
    newSale.userId = this.userId;
    newSale.memberId = this.selectedMember.id;
    newSale.date = this.currentDate;
    newSale.total = this.total;
    newSale.pay = this.pay;
    newSale.detailsSale = this.detailsSale;
    newSale.status = Status.valid;
    newSale.transaction = TransactionType.sale;
    newSale.balance = this.total - this.pay;
    /*newSale.balance = this.total - this.positiveBalanceSaleDto - this.pay;*/
    //newSale.positiveBalance = this.positiveBalanceSaleDto;
    console.log(newSale);
    return newSale;
  }

  submit() {
    if (this.detailsSale.length > 0) {
      let newSale = this.createSale();
      console.log(newSale);
      this.saleService.add(newSale).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/caja']);
        }, error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Ventas", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Ventas", ["Hubo un problema al intentar cargar la venta."]);
          }
        });
    } else {
      this.customAlertService.displayAlert("Gestión de Ventas", ["No se seleccionaron productos."]);
    }

  }
}
