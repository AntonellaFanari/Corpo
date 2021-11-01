import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../services/account.service';

@Directive({
  selector: '[access]'
})
export class AccessDirectiveDirective {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private accountService: AccountService) {
  }

  @Input("access") access: string;

  ngOnInit() {
    let permitedAccess = this.accountService.getAccess();
    console.log(permitedAccess);
    if (permitedAccess != null && permitedAccess.find(x=>x == this.access)) {
      this.viewContainer.createEmbeddedView(this.templateRef);

    }
    console.log(this.access);
   
  }

}
