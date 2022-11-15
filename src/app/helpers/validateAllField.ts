import { FormGroup, AbstractControl, FormArray } from '@angular/forms';

export function validateAllFields(form: FormGroup | FormArray) {
    Object.keys(form.controls).forEach((field) => {
        const control = form.get(field);
        if (control instanceof FormArray || control instanceof FormGroup) {
            validateAllFields(control);
        }
        control.markAsTouched({ onlySelf: true });
    });

}
