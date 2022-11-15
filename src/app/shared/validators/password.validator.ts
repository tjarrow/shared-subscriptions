import { AbstractControl } from "@angular/forms";
export function passwordValidator() {
  return ((control: AbstractControl): PasswordValidator | null => {
    const value = control.value;
    if (!value) return null;

    const hasLowercaseSymbol = value.toUpperCase() != value;
    const hasUppercaseSymbol = value.toLowerCase() != value;
    const hasDigit = (/[0-9]/.test(value));
    const isValid = hasLowercaseSymbol && hasUppercaseSymbol && hasDigit;

    return isValid ? null : { missedLowercaseSymbol: !hasLowercaseSymbol, missedUppercaseSymbol: !hasUppercaseSymbol, missedDigit: !hasDigit };
  })
}

export interface PasswordValidator {
  missedLowercaseSymbol: boolean;
  missedUppercaseSymbol: boolean;
  missedDigit: boolean;
}
