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
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { MemberCreateComponent } from './components/member/member-create/member-create.component';
import { MemberEditComponent } from './components/member/member-edit/member-edit.component';
import { MemberFormComponent } from './components/member/member-form/member-form.component';
import { MemberListComponent } from './components/member/member-list/member-list.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';
import { CustomAlertComponent } from './components/custom-alert/custom-alert.component';
import { MedicalHistoryCreateComponent } from './components/member/medical-history/medical-history-create/medical-history-create.component';
import { MedicalHistoryEditComponent } from './components/member/medical-history/medical-history-edit/medical-history-edit.component';
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
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { SaleEditComponent } from './components/sale/sale-edit/sale-edit.component';
import { SaleCreateComponent } from './components/sale/sale-create/sale-create.component';
import { InjuryHistoryComponent } from './components/member/injury-history/injury-history.component';
import { PlanCreateComponent } from './components/plan/plan-create/plan-create.component';
import { PlanListComponent } from './components/plan/plan-list/plan-list.component';
import { PlanEditComponent } from './components/plan/plan-edit/plan-edit.component';
import { PlanFormComponent } from './components/plan/plan-form/plan-form.component';
import { ClassCreateComponent } from './components/class/class-create/class-create.component';
import { ClassDetailComponent } from './components/class/class-detail/class-detail.component';
import { ClassEditComponent } from './components/class/class-edit/class-edit.component';
import { ClassListComponent } from './components/class/class-list/class-list.component';
import { ShiftCreateComponent } from './components/shift/shift-create/shift-create.component';
import { ShiftEditComponent } from './components/shift/shift-edit/shift-edit.component';
import { ShiftListComponent } from './components/shift/shift-list/shift-list.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { PersonalInformationComponent } from './components/user-menu/personal-information/personal-information.component';
import { PasswordEditComponent } from './components/user-menu/password-edit/password-edit.component';
import { EmailEditComponent } from './components/user-menu/email-edit/email-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UserCreateComponent,
    UserEditComponent,
    UserFormComponent,
    UserListComponent,
    MemberCreateComponent,
    MemberEditComponent,
    MemberFormComponent,
    MemberListComponent,
    UserViewComponent,
    CustomAlertComponent,
    MedicalHistoryCreateComponent,
    MedicalHistoryEditComponent,
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
    ProductEditComponent,
    ProductListComponent,
    ProductFormComponent,
    SaleEditComponent,
    SaleCreateComponent,
    InjuryHistoryComponent,
    PlanCreateComponent,
    PlanListComponent,
    PlanEditComponent,
    PlanFormComponent,
    ClassCreateComponent,
    ClassDetailComponent,
    ClassEditComponent,
    ClassListComponent,
    ShiftCreateComponent,
    ShiftEditComponent,
    ShiftListComponent,
    SearchFilterPipe,
    PersonalInformationComponent,
    PasswordEditComponent,
    EmailEditComponent,
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
      { path: 'user-create', component: UserCreateComponent, canActivate: [AuthGuard], data: { name: 'usuarios' }  },
      { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard], data: { name: 'usuarios' } },
      { path: 'user-view', component: UserViewComponent, canActivate: [AuthGuard], data: { name: 'usuarios' } },
      { path: 'user-edit', component: UserEditComponent, canActivate: [AuthGuard], data: { name: 'usuarios' } },
      { path: 'member-list', component: MemberListComponent, canActivate: [AuthGuard], data: { name: 'socios' } },
      { path: 'member-create', component: MemberCreateComponent },
      { path: 'member-edit', component: MemberEditComponent, canActivate: [AuthGuard]  },
      { path: 'member-view', component: MemberViewComponent, canActivate: [AuthGuard], data: { name: 'socios' } },
      { path: 'historia-médica-crear', component: MedicalHistoryCreateComponent, canActivate: [AuthGuard], data: { name: 'socios' } },
      { path: 'historia-médica-editar', component: MedicalHistoryEditComponent, canActivate: [AuthGuard], data: { name: 'socios' } },
      { path: 'antecedentes-lesiones', component: InjuryHistoryComponent, canActivate: [AuthGuard], data: { name: 'socios' } },
      { path: 'accesos', component: SettingsAccessComponent },
      { path: 'caja', component: CashFormComponent, canActivate: [AuthGuard], data: { name: 'caja' } },
      { path: 'login', component: LoginComponent },
      { path: 'cuota', component: ChargeFeeComponent, canActivate: [AuthGuard], data: { name: 'caja' }  },
      { path: 'venta-agregar', component: SaleCreateComponent, canActivate: [AuthGuard], data: { name: 'caja' }  },
      { path: 'egreso', component: OutflowComponent, canActivate: [AuthGuard], data: { name: 'caja' }  },
      { path: 'retiro', component: WithdrawalComponent, canActivate: [AuthGuard], data: { name: 'caja' }  },
      { path: 'product-create', component: ProductCreateComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'productos-list', component: ProductListComponent, canActivate: [AuthGuard], data: { name: 'abm' } },
      { path: 'product-detail', component: ProductEditComponent, canActivate: [AuthGuard], data: { name: 'abm' } },
      { path: 'plan-list', component: PlanListComponent, canActivate: [AuthGuard], data: { name: 'abm' } },
      { path: 'plan-crear', component: PlanCreateComponent, canActivate: [AuthGuard], data: { name: 'abm' } },
      { path: 'plan-editar', component: PlanEditComponent, canActivate: [AuthGuard], data: { name: 'abm' } },
      { path: 'clase-crear', component: ClassCreateComponent, canActivate: [AuthGuard], data: { name: 'abm' } },
      { path: 'clases-list', component: ClassListComponent, canActivate: [AuthGuard], data: { name: 'abm' } },
      { path: 'clase-editar', component: ClassEditComponent, canActivate: [AuthGuard], data: { name: 'abm' } },
      { path: 'turnos-list', component: ShiftListComponent, canActivate: [AuthGuard], data: { name: 'abm' } },
      { path: 'turno-crear', component: ShiftCreateComponent, canActivate: [AuthGuard], data: { name: 'abm' } },
      { path: 'datos-personales', component: PersonalInformationComponent },
      { path: 'modificar-email', component: EmailEditComponent },
      { path: 'modificar-contraseña', component: PasswordEditComponent }
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
