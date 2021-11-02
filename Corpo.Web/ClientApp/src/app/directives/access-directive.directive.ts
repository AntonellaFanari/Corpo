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
    let allowedAccesses = this.accountService.getAccess();
    if (allowedAccesses != null && allowedAccesses.find(x=>x == this.access)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }  
  }

}
