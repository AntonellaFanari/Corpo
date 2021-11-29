import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleAccess } from './domain/role-access';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  navbarCollapsed = true;
  logueado: boolean = false;
  user = {};
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.logueado = this.accountService.isAuthenticated();
    console.log(this.accountService.getToken());
    console.log(this.logueado);
    this.user = this.accountService.getLoggedUser();
  }

  signOff() {
    this.accountService.setAuthenticated(false);
    localStorage.clear();
    this.ngOnInit();
    this.router.navigate(['/login']);
  }
   
}
