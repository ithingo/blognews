import {AbstractControl, ValidatorFn } from '@angular/forms';

export function ValidateTrimmedNames(control: AbstractControl) {

  console.log(control.value);
  console.log(control.value.toString().trim());

  if (control.value !== '' && control.value.toString().trim() === '') {
    return { validateTrimmed: true }
  }
  return null;
}

