import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ConfirmPasswordValidationDirective), multi: true }
  ]
})

export class ConfirmPasswordValidationDirective implements Validator {
  constructor(
    @Attribute('validateEqual')
    public validateEqual: string
  ) {}

  validate(abstractControl: AbstractControl): { [key: string]: any } {
    const password = abstractControl.get('password').value;
    const passwordConfirmation = abstractControl.get('password_confirmation').value;

    if(password && password != passwordConfirmation) {
      return { validateEqual: false }
    }
    return null;
  }
}
