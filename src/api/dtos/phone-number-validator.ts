import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

@ValidatorConstraint({ async: false })
export class IsPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: any) {
    const phoneUtil = PhoneNumberUtil.getInstance();
    try {
      const number = phoneUtil.parse(phoneNumber, 'US'); //TODO: Supporting US only for now
      return phoneUtil.isValidNumber(number);
    } catch {
      return false;
    }
  }

  defaultMessage() {
    return 'Phone number must be valid';
  }
}

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneNumberConstraint,
    });
  };
}

export function convertNumberToE164(phoneNumber: string): string {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const number = phoneUtil.parse(phoneNumber, 'US'); //TODO: Supporting US only for now
  const isValid = phoneUtil.isValidNumber(number);
  if (!isValid) {
    throw new Error('Phone number must be valid');
  }
  return phoneUtil.format(number, PhoneNumberFormat.E164);
}
