import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { MemberCreateComponent } from './components/member/member-create/member-create.component';
import { MemberDetailComponent } from './components/member/member-detail/member-detail.component';
import { MemberFormComponent } from './components/member/member-form/member-form.component';
import { MemberListComponent } from './components/member/member-list/member-list.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';
import { CustomAlertComponent } from './components/custom-alert/custom-alert.component';
import { MedicalHistoryCreateComponent } from './components/member/medical-history/medical-history-create/medical-history-create.component';
import { MedicalHistoryDetailComponent } from './components/member/medical-history/medical-history-detail/medical-history-detail.component';
import { MedicalHistoryFormComponent } from './components/member/medical-history/medical-history-form/medical-history-form.component';
import { CashFormComponent } from './components/cash/cash-form/cash-form.component';
import { MemberViewComponent } from './components/member/member-view/member-view.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsAccessComponent } from './components/settings/settings-access/settings-access.component';
import { AuthInterceptor } from './services/authentication-interceptor';
import { AccessDirectiveDirective } from './directives/access-directive.directive';
import { AuthGuard } from './guards/auth.guard.service';
import { ChargeFeeComponent } from './components/cash/charge-fee/charge-fee.component';
import { OutflowComponent } from './components/cash/outflow/outflow.component';
import { WithdrawalComponent } from './components/cash/withdrawal/withdrawal.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { SaleDetailComponent } from './components/sale/sale-detail/sale-detail.component';
import { SaleCreateComponent } from './components/sale/sale-create/sale-create.component';
import { InjuryHistoryComponent } from './components/member/injury-history/injury-history.component';
import { PlanCreateComponent } from './components/plan/plan-create/plan-create.component';
import { PlanListComponent } from './components/plan/plan-list/plan-list.component';
import { PlanDetailComponent } from './components/plan/plan-detail/plan-detail.component';
import { PlanFormComponent } from './components/plan/plan-form/plan-form.component';
import { ClassCreateComponent } from './components/class/class-create/class-create.component';
import { ClassDetailComponent } from './components/class/class-detail/class-detail.component';
import { ClassEditComponent } from './components/class/class-edit/class-edit.component';
import { ClassListComponent } from './components/class/class-list/class-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UserCreateComponent,
    UserDetailComponent,
    UserFormComponent,
    UserListComponent,
    MemberCreateComponent,
    MemberDetailComponent,
    MemberFormComponent,
    MemberListComponent,
    UserViewComponent,
    CustomAlertComponent,
    MedicalHistoryCreateComponent,
    MedicalHistoryDetailComponent,
    MedicalHistoryFormComponent,
    SettingsAccessComponent,
    CashFormComponent,
    MemberViewComponent,
    LoginComponent,
    AccessDirectiveDirective,
    ChargeFeeComponent,
    OutflowComponent,
    WithdrawalComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductFormComponent,
    SaleDetailComponent,
    SaleCreateComponent,
    InjuryHistoryComponent,
    PlanCreateComponent,
    PlanListComponent,
    PlanDetailComponent,
    PlanFormComponent,
    ClassCreateComponent,
    ClassDetailComponent,
    ClassEditComponent,
    ClassListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbCollapseModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'user-create', component: UserCreateComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'user-view', component: UserViewComponent },
      { path: 'user-detail', component: UserDetailComponent },
      { path: 'member-list', component: MemberListComponent },
      { path: 'member-create', component: MemberCreateComponent },
      { path: 'member-detail', component: MemberDetailComponent },
      { path: 'member-view', component: MemberViewComponent },
      { path: 'historia-médica-crear', component: MedicalHistoryCreateComponent },
      { path: 'historia-médica-editar', component: MedicalHistoryDetailComponent },
      { path: 'antecedentes-lesiones', component: InjuryHistoryComponent },
      { path: 'accesos', component: SettingsAccessComponent },
      { path: 'caja', component: CashFormComponent, canActivate: [AuthGuard], data: { name: 'caja' } },
      { path: 'login', component: LoginComponent },
      { path: 'cuota', component: ChargeFeeComponent },
      { path: 'venta-agregar', component: SaleCreateComponent },
      { path: 'egreso', component: OutflowComponent },
      { path: 'retiro', component: WithdrawalComponent },
      { path: 'product-create', component: ProductCreateComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'product-detail', component: ProductDetailComponent },
      { path: 'plan-list', component: PlanListComponent },
      { path: 'plan-crear', component: PlanCreateComponent },
      { path: 'plan-editar', component: PlanDetailComponent },
      { path: 'clase-crear', component: ClassCreateComponent },
      { path: 'class-list', component: ClassListComponent },
      { path: 'clase-editar', component: ClassEditComponent }
    ])
  ],
  entryComponents: [
    CustomAlertComponent
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
