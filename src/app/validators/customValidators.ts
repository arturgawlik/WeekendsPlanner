import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const identityPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const signupPassword = control.get('signupPassword');
    const signupPasswordRepeat = control.get('signupPasswordRepeat');
    
    return signupPassword && signupPasswordRepeat && signupPassword.value !== signupPasswordRepeat.value ? { 'identityPassword': true } : null;
};