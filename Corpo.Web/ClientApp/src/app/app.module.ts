import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { MemberCreateComponent } from './components/member/member-create/member-create.component';
import { MemberDetailComponent } from './components/member/member-detail/member-detail.component';
import { MemberFormComponent } from './components/member/member-form/member-form.component';
import { MemberListComponent } from './components/member/member-list/member-list.component';
import { MemberLoginComponent } from './components/member/member-login/member-login.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';
import { CustomAlertComponent } from './components/custom-alert/custom-alert.component';
import { HistoryMedicalCreateComponent } from './components/member/history-medical/history-medical-create/history-medical-create.component';
import { HistoryMedicalDetailComponent } from './components/member/history-medical/history-medical-detail/history-medical-detail.component';
import { HistoryMedicalFormComponent } from './components/member/history-medical/history-medical-form/history-medical-form.component';

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
    UserLoginComponent,
    MemberCreateComponent,
    MemberDetailComponent,
    MemberFormComponent,
    MemberListComponent,
    MemberLoginComponent,
    UserViewComponent,
    CustomAlertComponent,
    HistoryMedicalCreateComponent,
    HistoryMedicalDetailComponent,
    HistoryMedicalFormComponent
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
      { path: 'history-medical-create', component: HistoryMedicalCreateComponent }
    ])
  ],
  entryComponents: [
    CustomAlertComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
