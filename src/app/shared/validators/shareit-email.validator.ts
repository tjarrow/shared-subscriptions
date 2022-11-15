import { AbstractControl } from "@angular/forms";

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const EMAIL_DOMAIN = /.+\.+/;
export function shareitEmailValidator(control: AbstractControl) {
  const { value } = control;
  if (value == null || value.length === 0) {
      return null;
  }

  const isEmail = EMAIL_REGEXP.test(value);

  if (!isEmail) {
    return { 'email': true };
  }

  return EMAIL_DOMAIN.test(value.split('@')[1]) ? null : { 'email': true };
} 