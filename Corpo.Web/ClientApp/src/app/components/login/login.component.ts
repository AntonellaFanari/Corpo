import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../domain/account';
import { AccountService } from '../../services/account.service';
import { CustomAlertService } from '../../services/custom-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  sent: boolean = false;
  return: string = '';

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private customAlertService: CustomAlertService, private router: Router, private route: ActivatedRoute) {
    this.formLogin = this.formBuilder.group({
      email: ['javiermarchetti83@gmail.com', Validators.required],
      password: [ 'Abcd1234', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/forums');
  }

  get f() {
    return this.formLogin.controls;
  }

  logIn() {
    this.sent = true;
    if (this.formLogin.valid) {
      let account = new Account()
      {
        account.email = this.formLogin.value.email,
        account.password = this.formLogin.value.password
      };
      this.accountService.logIn(account).subscribe(
        result => {
          console.log(result);
          this.accountService.setToken(result.token);
          this.accountService.setAuthenticated(true);
          this.accountService.setLoggedUser(result.user);
          this.router.navigateByUrl(this.return);
          this.ngOnInit();
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Autenticación de Usuarios", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Autenticación de Usuarios", ["Hubo un problema al intentar iniciar sesión."]);
          }
        });
    }
    
  }

}
