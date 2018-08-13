import {AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenTrimmedValue(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenTrimmedValue': {value: control.value}} : null;
  }
}
