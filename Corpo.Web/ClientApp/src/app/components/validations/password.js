"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
var Password = /** @class */ (function () {
    function Password() {
    }
    Password.mustMatch = function (controlName, matchingControlName) {
        return function (formGroup) {
            var control = formGroup.controls[controlName];
            var matchingControl = formGroup.controls[matchingControlName];
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
            }
            else {
                /*  console.log("llegue4");*/
                matchingControl.setErrors(null);
            }
        };
    };
    return Password;
}());
exports.Password = Password;
//  static equalPassword(form: FormGroup): ValidationErrors | null {
//    var password = form.get('password').value;
//    var repeatPassword = form.get('repeatPassword').value;
//    if (password === repeatPassword) {
//      return null;
//    } else {
//      return { equalPassw: true }
//    }
//  }
//# sourceMappingURL=password.js.map