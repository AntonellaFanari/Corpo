import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

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
import { HistoryMedicalCreateComponent } from './components/member/history-medical/history-medical-create/history-medical-create.component';
import { HistoryMedicalDetailComponent } from './components/member/history-medical/history-medical-detail/history-medical-detail.component';
import { HistoryMedicalFormComponent } from './components/member/history-medical/history-medical-form/history-medical-form.component';
import { CashFormComponent } from './components/cash/cash-form/cash-form.component';
import { MemberViewComponent } from './components/member/member-view/member-view.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsAccessComponent } from './components/settings/settings-access/settings-access.component';
import { AuthInterceptor } from './services/authentication-interceptor';
import { AccessDirectiveDirective } from './directives/access-directive.directive';
import { AuthGuard } from './guards/auth.guard.service';
import { ChargeFeeComponent } from './components/cash/charge-fee/charge-fee.component';

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
    HistoryMedicalCreateComponent,
    HistoryMedicalDetailComponent,
    HistoryMedicalFormComponent,
    SettingsAccessComponent,
    CashFormComponent,
    MemberViewComponent,
    LoginComponent,
    AccessDirectiveDirective,
    ChargeFeeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbCollapseModule,
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
      { path: 'history-medical-create', component: HistoryMedicalCreateComponent },
      { path: 'history-medical-detail', component: HistoryMedicalDetailComponent },
      { path: 'accesos', component: SettingsAccessComponent },
      { path: 'caja', component: CashFormComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'charge-fee', component: ChargeFeeComponent }
    ])
  ],
  entryComponents: [
    CustomAlertComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
