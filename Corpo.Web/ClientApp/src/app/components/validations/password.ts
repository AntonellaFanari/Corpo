import { FormGroup } from "@angular/forms";


export class Password {
  static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      /*console.log("llegue1");*/
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      /*  console.log("llegue2");*/
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
      /*  console.log("llegue3");*/
        matchingControl.setErrors({ mustMatch: true });
      } else {
      /*  console.log("llegue4");*/
        matchingControl.setErrors(null);
      }
    }
  }
}
//  static equalPassword(form: FormGroup): ValidationErrors | null {
//    var password = form.get('password').value;
//    var repeatPassword = form.get('repeatPassword').value;
//    if (password === repeatPassword) {
//      return null;
//    } else {
//      return { equalPassw: true }
//    }
//  }
