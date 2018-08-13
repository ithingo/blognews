import {AbstractControl, ValidatorFn } from '@angular/forms';

export function ValidateTrimmedNames(control: AbstractControl) {
  if (control.value !== '' && control.value.toString().trim() === '') {
    return { validateTrimmed: true }
  }
  return null;
}

