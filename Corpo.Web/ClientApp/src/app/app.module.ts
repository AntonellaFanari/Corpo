import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatIconModule } from '@angular/material/icon'

import { WodDetailComponent } from './components/workout/wod-template/wod-detail/wod-detail.component';
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
import { ClassEditComponent } from './components/class/class-edit/class-edit.component';
import { ClassListComponent } from './components/class/class-list/class-list.component';
import { ShiftCreateComponent } from './components/shift/shift-create/shift-create.component';
import { ShiftEditComponent } from './components/shift/shift-edit/shift-edit.component';
import { ShiftListComponent } from './components/shift/shift-list/shift-list.component';
import { SearchFilterShiftPipe } from './pipes/search-filter-shift.pipe';
import { PersonalInformationComponent } from './components/user-menu/personal-information/personal-information.component';
import { PasswordEditComponent } from './components/user-menu/password-edit/password-edit.component';
import { EmailEditComponent } from './components/user-menu/email-edit/email-edit.component';
import { PurchaseCreateComponent } from './components/purchase/purchase-create/purchase-create.component';
import { PurchaseListComponent } from './components/purchase/purchase-list/purchase-list.component';
import { SearchFilterMemberPipe } from './pipes/search-filter-member.pipe';
import { SearchFilterProductPipe } from './pipes/search-filter-product.pipe';
import { PurchaseDetailComponent } from './components/purchase/purchase-detail/purchase-detail.component';
import { SearchFilterClassPipe } from './pipes/search-filter-class.pipe';
import { SearchFilterPlanPipe } from './pipes/search-filter-plan.pipe';
import { SearchFilterUserPipe } from './pipes/search-filter-user.pipe';
import { OutflowTypeCreateComponent } from './components/outflow-type/outflow-type-create/outflow-type-create.component';
import { OutflowTypeEditComponent } from './components/outflow-type/outflow-type-edit/outflow-type-edit.component';
import { OutflowTypeListComponent } from './components/outflow-type/outflow-type-list/outflow-type-list.component';
import { SearchFilterOutflowPipe } from './pipes/search-filter-outflow.pipe';
import { OutflowCreateComponent } from './components/outflow/outflow-create/outflow-create.component';
import { OutflowDetailComponent } from './components/outflow/outflow-detail/outflow-detail.component';
import { FeeCreateComponent } from './components/fee/fee-create/fee-create.component';
import { ExercisesCreateComponent } from './components/exercises/exercises-create/exercises-create.component';
import { ExercisesEditComponent } from './components/exercises/exercises-edit/exercises-edit.component';
import { ExercisesListComponent } from './components/exercises/exercises-list/exercises-list.component';
import { SearchFilterExercisePipe } from './pipes/search-filter-exercise.pipe';
import { CategoryExercisesCreateComponent } from './components/category-exercises/category-exercises-create/category-exercises-create.component';
import { CategoryExercisesEditComponent } from './components/category-exercises/category-exercises-edit/category-exercises-edit.component';
import { CategoryExercisesListComponent } from './components/category-exercises/category-exercises-list/category-exercises-list.component';
import { SearchFilterNamePipe } from './pipes/search-filter-name.pipe';
import { TagListComponent } from './components/tag/tag-list/tag-list.component';
import { TagCreateComponent } from './components/tag/tag-create/tag-create.component';
import { TagEditComponent } from './components/tag/tag-edit/tag-edit.component';
import { FeeDetailComponent } from './components/fee/fee-detail/fee-detail.component';
import { PromotionCreateComponent } from './components/promotion/promotion-create/promotion-create.component';
import { PromotionEditComponent } from './components/promotion/promotion-edit/promotion-edit.component';
import { PromotionListComponent } from './components/promotion/promotion-list/promotion-list.component';
import { DebtListComponent } from './components/debt/debt-list/debt-list.component';
import { DebtDetailComponent } from './components/debt/debt-detail/debt-detail.component';
import { DebtEditComponent } from './components/debt/debt-edit/debt-edit.component';
import { FeePromotionComponent } from './components/fee/fee-promotion/fee-promotion.component';
import { WithdrawalCreateComponent } from './components/withdrawal/withdrawal-create/withdrawal-create.component';
import { WithdrawalDetailComponent } from './components/withdrawal/withdrawal-detail/withdrawal-detail.component';
import { WithdrawalNameCreateComponent } from './components/withdrawalName/withdrawal-name-create/withdrawal-name-create.component';
import { WithdrawalNameEditComponent } from './components/withdrawalName/withdrawal-name-edit/withdrawal-name-edit.component';
import { WithdrawalNameListComponent } from './components/withdrawalName/withdrawal-name-list/withdrawal-name-list.component';
import { MyDebtsComponent } from './components/user-menu/my-debts/my-debts.component';
import { AttendanceShiftsListComponent } from './components/attendance/attendance-shifts-list/attendance-shifts-list.component';
import { AttendanceComponent } from './components/attendance/attendance/attendance.component';
import { MyReservationsComponent } from './components/user-menu/my-reservations/my-reservations.component';
import { NewsCreateComponent } from './components/news/news-create/news-create.component';
import { NewsEditComponent } from './components/news/news-edit/news-edit.component';
import { NewsListComponent } from './components/news/news-list/news-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemberReportComponent } from './components/reports/member-report/member-report.component';
import { MemberReportListComponent } from './components/reports/member-report-list/member-report-list.component';
import { ReservationsComponent } from './components/member/reservations/reservations.component';
import { IncomeCreateComponent } from './components/income/income-create/income-create.component';
import { IncomeDetailComponent } from './components/income/income-detail/income-detail.component';
import { DailyCashComponent } from './components/reports/cash/daily-cash/daily-cash.component';
import { CashDetailComponent } from './components/reports/cash/cash-detail/cash-detail.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WodTemplateListComponent } from './components/workout/wod-template/wod-template-list/wod-template-list.component';
import { WodTemplateComponent } from './components/workout/wod-template/wod-template-create/wod-template.component';
import { WodTemplateFormComponent } from './components/workout/wod-template/wod-template-form/wod-template-form.component';
import { WorkoutPeriodizationComponent } from './components/workout/workout-periodization/workout-periodization.component';
import { AssignmentListComponent } from './components/workout/assignment-list/assignment-list.component';
import { AssignmentTemplateComponent } from './components/workout/assignment-template/assignment-template.component';
import { AssignmentTemplateFormComponent } from './components/workout/assignment-template-form/assignment-template-form.component';
import { AssignmentCalendarComponent } from './components/workout/assignment-calendar/assignment-calendar.component';
import { MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRippleModule, MatTabsModule } from '@angular/material';
import { ModalityCreateComponent } from './components/modality/modality-create/modality-create.component';
import { ModalityEditComponent } from './components/modality/modality-edit/modality-edit.component';
import { ModalityListComponent } from './components/modality/modality-list/modality-list.component';
import { ModalityDetailComponent } from './components/modality/modality-detail/modality-detail.component';
import { Modality } from './domain/wod/modality';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutPeriodizaionEditComponent } from './components/workout/workout-periodizaion-edit/workout-periodizaion-edit.component';
import { WorkoutPeriodizaionDetailComponent } from './components/workout/workout-periodizaion-detail/workout-periodizaion-detail.component';
import { MonthlyEarningComponent } from './components/reports/cash/monthly-earning/monthly-earning.component';
import { MemberBehaviourComponent } from './components/reports/marketing/member-behaviour/member-behaviour.component';
import { SegmentedStatisticsComponent } from './components/reports/marketing/segmented-statistics/segmented-statistics.component';
import { GeneralSettingsComponent } from './components/settings/general-settings/general-settings.component';
import { MonthlyGoalCreateComponent } from './components/monthly-goal/monthly-goal-create/monthly-goal-create.component';
import { MonthlyGoalEditComponent } from './components/monthly-goal/monthly-goal-edit/monthly-goal-edit.component';
import { MonthlyGoalListComponent } from './components/monthly-goal/monthly-goal-list/monthly-goal-list.component';
import { WeeklyGoalListComponent } from './components/weekly-goal/weekly-goal-list/weekly-goal-list.component';
import { WeeklyGoalCreateComponent } from './components/weekly-goal/weekly-goal-create/weekly-goal-create.component';
import { WeeklyGoalEditComponent } from './components/weekly-goal/weekly-goal-edit/weekly-goal-edit.component';
import { AssignmentTemplateEditComponent } from './components/workout/assignment-template-edit/assignment-template-edit.component';
import { SearchFilterIntensityPipe } from './pipes/search-filter-intensity.pipe';
import { StatisticsWodMemberComponent } from './components/workout/statistics/statistics-wod-member/statistics-wod-member.component';
import { StatisticsPeriodizationComponent } from './components/workout/statistics/statistics-periodization/statistics-periodization.component';
import { StatisticsMenuComponent } from './components/workout/statistics/statistics-menu/statistics-menu.component';
import { ReportMonthlyComponent } from './components/workout/statistics/report-monthly/report-monthly.component';
import { ReportWeeklyComponent } from './components/workout/statistics/report-weekly/report-weekly.component';
import { ReportAnnualComponent } from './components/workout/statistics/report-annual/report-annual.component';
import { TrainingSystemCreateComponent } from './components/training-system/training-system-create/training-system-create.component';
import { TrainingSystemEditComponent } from './components/training-system/training-system-edit/training-system-edit.component';
import { TrainingSystemListComponent } from './components/training-system/training-system-list/training-system-list.component';
import { SearchFilterTrainingSystemPipe } from './pipes/search-filter-training-system.pipe';
import { TestTemplateCreateComponent } from './components/test/test-template/test-template-create/test-template-create.component';
import { TestTemplateEditComponent } from './components/test/test-template/test-template-edit/test-template-edit.component';
import { TestTemplateListComponent } from './components/test/test-template/test-template-list/test-template-list.component';
import { TestAssignmentCreateComponent } from './components/test/test-assignment/test-assignment-create/test-assignment-create.component';
import { TestAssignmentListComponent } from './components/test/test-assignment/test-assignment-list/test-assignment-list.component';
import { TestAssignmentEditComponent } from './components/test/test-assignment/test-assignment-edit/test-assignment-edit.component';
import { TestAssignmentDetailComponent } from './components/test/test-assignment/test-assignment-detail/test-assignment-detail.component';
import { TestResultComponent } from './components/test/test-result/test-result.component';
import { TestListComponent } from './components/test/test-list/test-list.component';
import { SafePipe } from './pipes/safe.pipe';
import { TestDetailComponent } from './components/test/test-detail/test-detail.component';


@NgModule({
  declarations: [
    WodDetailComponent,
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
    ClassEditComponent,
    ClassListComponent,
    ShiftCreateComponent,
    ShiftEditComponent,
    ShiftListComponent,
    SearchFilterShiftPipe,
    PersonalInformationComponent,
    PasswordEditComponent,
    EmailEditComponent,
    PurchaseCreateComponent,
    PurchaseListComponent,
    SearchFilterMemberPipe,
    SearchFilterProductPipe,
    PurchaseDetailComponent,
    SearchFilterClassPipe,
    SearchFilterPlanPipe,
    SearchFilterUserPipe,
    OutflowTypeCreateComponent,
    OutflowTypeEditComponent,
    OutflowTypeListComponent,
    SearchFilterOutflowPipe,
    OutflowCreateComponent,
    OutflowDetailComponent,
    FeeCreateComponent,
    ExercisesCreateComponent,
    ExercisesEditComponent,
    ExercisesListComponent,
    SearchFilterExercisePipe,
    CategoryExercisesCreateComponent,
    CategoryExercisesEditComponent,
    CategoryExercisesListComponent,
    SearchFilterNamePipe,
    TagListComponent,
    TagCreateComponent,
    TagEditComponent,
    FeeDetailComponent,
    PromotionCreateComponent,
    PromotionEditComponent,
    PromotionListComponent,
    DebtListComponent,
    DebtDetailComponent,
    DebtEditComponent,
    FeePromotionComponent,
    WithdrawalCreateComponent,
    WithdrawalDetailComponent,
    WithdrawalNameCreateComponent,
    WithdrawalNameEditComponent,
    WithdrawalNameListComponent,
    MyDebtsComponent,
    AttendanceShiftsListComponent,
    AttendanceComponent,
    MyReservationsComponent,
    NewsCreateComponent,
    NewsEditComponent,
    NewsListComponent,
    WodTemplateComponent,
    MemberReportComponent,
    MemberReportListComponent,
    ReservationsComponent,
    IncomeCreateComponent,
    IncomeDetailComponent,
    DailyCashComponent,
    CashDetailComponent,
    WodTemplateListComponent,
    WodTemplateFormComponent,
    WorkoutPeriodizationComponent,
    IncomeDetailComponent,
    AssignmentListComponent,
    AssignmentTemplateComponent,
    AssignmentTemplateFormComponent,
    AssignmentCalendarComponent,
    ModalityCreateComponent,
    ModalityEditComponent,
    ModalityListComponent,
    ModalityDetailComponent,
    MonthlyEarningComponent,
    MemberBehaviourComponent,
    SegmentedStatisticsComponent,
    GeneralSettingsComponent,
    WorkoutPeriodizaionEditComponent,
    WorkoutPeriodizaionDetailComponent,
    MonthlyGoalCreateComponent,
    MonthlyGoalEditComponent,
    MonthlyGoalListComponent,
    WeeklyGoalListComponent,
    WeeklyGoalCreateComponent,
    WeeklyGoalEditComponent,
    AssignmentTemplateEditComponent,
    SearchFilterIntensityPipe,
    StatisticsWodMemberComponent,
    StatisticsPeriodizationComponent,
    StatisticsMenuComponent,
    ReportMonthlyComponent,
    ReportWeeklyComponent,
    ReportAnnualComponent,
    TrainingSystemCreateComponent,
    TrainingSystemEditComponent,
    TrainingSystemListComponent,
    SearchFilterTrainingSystemPipe,
    TestTemplateCreateComponent,
    TestTemplateEditComponent,
    TestTemplateListComponent,
    TestAssignmentCreateComponent,
    TestAssignmentListComponent,
    TestAssignmentEditComponent,
    TestAssignmentDetailComponent,
    TestResultComponent,
    TestListComponent,
    SafePipe,
    TestDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbCollapseModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,  
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'asignacion-calendario', component: AssignmentCalendarComponent },
      { path: 'member-report', component: MemberReportComponent, canActivate: [AuthGuard], data: { name: 'informes' } },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'user-create', component: UserCreateComponent, canActivate: [AuthGuard], data: { name: 'usuarios' }  },
      { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard], data: { name: 'usuarios' } },
      { path: 'user-view', component: UserViewComponent, canActivate: [AuthGuard], data: { name: 'usuarios' } },
      { path: 'user-edit', component: UserEditComponent, canActivate: [AuthGuard], data: { name: 'usuarios' } },
      { path: 'member-list', component: MemberListComponent, canActivate: [AuthGuard], data: { name: 'socios' } },
      { path: 'member-create', component: MemberCreateComponent },
      { path: 'member-edit', component: MemberEditComponent },
      { path: 'member-view', component: MemberViewComponent },
      { path: 'historia-médica-crear', component: MedicalHistoryCreateComponent },
      { path: 'historia-médica-editar', component: MedicalHistoryEditComponent },
      { path: 'antecedentes-lesiones', component: InjuryHistoryComponent },
      { path: 'accesos', component: SettingsAccessComponent },
      { path: 'caja', component: CashFormComponent, canActivate: [AuthGuard], data: { name: 'caja' } },
      { path: 'login', component: LoginComponent },
      { path: 'cuota-agregar', component: FeeCreateComponent, canActivate: [AuthGuard], data: { name: 'caja' }  },
      { path: 'venta-agregar', component: SaleCreateComponent, canActivate: [AuthGuard], data: { name: 'caja' }  },
      { path: 'egreso', component: OutflowCreateComponent, canActivate: [AuthGuard], data: { name: 'caja' }  },
      { path: 'retiro', component: WithdrawalCreateComponent, canActivate: [AuthGuard], data: { name: 'caja' } },
      { path: 'ingreso', component: IncomeCreateComponent, canActivate: [AuthGuard], data: { name: 'caja' } },
      { path: 'product-agregar', component: ProductCreateComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
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
      { path: 'modificar-contraseña', component: PasswordEditComponent },
      { path: 'mis-deudas', component: MyDebtsComponent },
      { path: 'mis-reservas', component: MyReservationsComponent },
      { path: 'compras-list', component: PurchaseListComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'compra-crear', component: PurchaseCreateComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'purchase-detail', component: PurchaseDetailComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'egreso-crear', component: OutflowTypeCreateComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'egreso-editar', component: OutflowTypeEditComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'egresos-list', component: OutflowTypeListComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'ejercicios-list', component: ExercisesListComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'ejercicio-crear', component: ExercisesCreateComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'ejercicio-editar', component: ExercisesEditComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'categoria-crear', component: CategoryExercisesCreateComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'categorias-list', component: CategoryExercisesListComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'categoria-editar', component: CategoryExercisesEditComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'tags-list', component: TagListComponent, canActivate: [AuthGuard], data: { name: 'abm' } },
      { path: 'tag-crear', component: TagCreateComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'tag-editar', component: TagEditComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'promociones-list', component: PromotionListComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'promocion-crear', component: PromotionCreateComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'promocion-editar', component: PromotionEditComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'deudas-list', component: DebtListComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'deudas-detalle', component: DebtDetailComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'deuda-editar', component: DebtEditComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'retiro-crear', component: WithdrawalNameCreateComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'retiro-editar', component: WithdrawalNameEditComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'retiros-list', component: WithdrawalNameListComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'asistencias-turnos', component: AttendanceShiftsListComponent, canActivate: [AuthGuard], data: { name: 'asistencias' }   },
      { path: 'asistencias', component: AttendanceComponent, canActivate: [AuthGuard], data: { name: 'asistencias' } },
      { path: 'noticias-list', component: NewsListComponent, canActivate: [AuthGuard], data: { name: 'comunicación' } },
      { path: 'noticia-crear', component: NewsCreateComponent, canActivate: [AuthGuard], data: { name: 'comunicación' }  },
      { path: 'noticia-editar', component: NewsEditComponent, canActivate: [AuthGuard], data: { name: 'comunicación' }  },
      { path: 'listado-informe-socios', component: MemberReportListComponent, canActivate: [AuthGuard], data: { name: 'informes' }  },
      { path: 'reservas', component: ReservationsComponent, canActivate: [AuthGuard], data: { name: 'socios' }  },
      { path: 'caja-diaria', component: DailyCashComponent, canActivate: [AuthGuard], data: { name: 'informes' }  },
      { path: 'caja-detalle', component: CashDetailComponent, canActivate: [AuthGuard], data: { name: 'informes' }  },
      { path: 'asignacion-wod', component: AssignmentListComponent },
      { path: 'asignacion-plantilla', component: AssignmentTemplateComponent },
      { path: 'modalidades-list', component: ModalityListComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'modalidad-crear', component: ModalityCreateComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'modalidad-editar', component: ModalityEditComponent, canActivate: [AuthGuard], data: { name: 'abm' }  },
      { path: 'ganancias-mensuales', component: MonthlyEarningComponent, canActivate: [AuthGuard], data: { name: 'informes' }  },
      { path: 'estadisticas-segmentadas', component: SegmentedStatisticsComponent, canActivate: [AuthGuard], data: { name: 'informes' }  },
      { path: 'configuraciones', component: GeneralSettingsComponent, canActivate: [AuthGuard], data: { name: 'ajustes' } },
      { path: 'objetivos-mensuales-list', component: MonthlyGoalListComponent, canActivate: [AuthGuard], data: { name: 'wod' } },
      { path: 'objetivo-mensual-crear', component: MonthlyGoalCreateComponent, canActivate: [AuthGuard], data: { name: 'wod' } },
      { path: 'objetivo-mensual-editar', component: MonthlyGoalEditComponent, canActivate: [AuthGuard], data: { name: 'wod' } },
      { path: 'objetivos-semanales-list', component: WeeklyGoalListComponent, canActivate: [AuthGuard], data: { name: 'wod' } },
      { path: 'objetivo-semanal-crear', component: WeeklyGoalCreateComponent, canActivate: [AuthGuard], data: { name: 'wod' } },
      { path: 'objetivo-semanal-editar', component: WeeklyGoalEditComponent, canActivate: [AuthGuard], data: { name: 'wod' } },
      { path: 'sistemas-entrenamiento-list', component: TrainingSystemListComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'sistema-entrenamiento-crear', component: TrainingSystemCreateComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'sistema-entrenamiento-editar', component: TrainingSystemEditComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'wod-template', component: WodTemplateComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'plantillas-wod', component: WodTemplateListComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'periodizacion', component: WorkoutPeriodizationComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'detalle-periodizacion', component: WorkoutPeriodizaionDetailComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'editar-periodizacion', component: WorkoutPeriodizaionEditComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'editar-asignacion-wod', component: AssignmentTemplateEditComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'estadisticas', component: StatisticsMenuComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'estadisticas-wod', component: StatisticsWodMemberComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'estadisticas-periodizaciones', component: StatisticsPeriodizationComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'reporte-mensual', component: ReportMonthlyComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'reporte-semanal', component: ReportWeeklyComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'reporte-anual', component: ReportAnnualComponent, canActivate: [AuthGuard], data: { name: 'wod' }  },
      { path: 'test-templates-list', component: TestTemplateListComponent, canActivate: [AuthGuard], data: { name: 'test' }  },
      { path: 'test-template-crear', component: TestTemplateCreateComponent, canActivate: [AuthGuard], data: { name: 'test' } },
      { path: 'test-template-editar', component: TestTemplateEditComponent, canActivate: [AuthGuard], data: { name: 'test' } },
      { path: 'test-asignacion', component: TestAssignmentCreateComponent, canActivate: [AuthGuard], data: { name: 'test' } },
      { path: 'test', component: TestListComponent, canActivate: [AuthGuard], data: { name: 'test' } },
      { path: 'test-asignado-editar', component: TestAssignmentEditComponent, canActivate: [AuthGuard], data: { name: 'test' } },
      { path: 'test-asignados-list', component: TestAssignmentListComponent, canActivate: [AuthGuard], data: { name: 'test' } },
      { path: 'resultado-test', component: TestResultComponent, canActivate: [AuthGuard], data: { name: 'test' } },
      { path: 'test-detalle', component: TestDetailComponent, canActivate: [AuthGuard], data: { name: 'test' } },
      { path: 'test-asignado-detalle', component: TestAssignmentDetailComponent, canActivate: [AuthGuard], data: { name: 'test' } }
    ])
  ],
  entryComponents: [
    CustomAlertComponent
  ],
  providers: [
    MatDatepickerModule,
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
