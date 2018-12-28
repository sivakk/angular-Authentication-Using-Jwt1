import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UsernameValidators {

    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0)
            return { cannotContainSpace: true };
        else {
            return null;
        }



    }
    static cannotContainSpace1(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0)
            return { cannotContainSpace1: true };
        else {
            return null;
        }



    }
    static cannotContainSpace2(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0)
            return { cannotContainSpace2: true };
        else {
            return null;
        }



    }



    static phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
        const valid = /^\d+$/.test(control.value);
        return valid ? null : { invalidNumber: { valid: false, value: control.value } };
    }




}