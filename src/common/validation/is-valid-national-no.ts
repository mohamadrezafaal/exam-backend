import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import {ValidateNationalNo} from "@/common/utils/validate-national-no";

@ValidatorConstraint({ name: 'isValidNationalNoConstraint', async: true })
@Injectable()
export class IsValidNationalNoConstraint
  implements ValidatorConstraintInterface
{
  constructor() {}
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'کد ملی وارد شده نا معتبر است';
  }
  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    return ValidateNationalNo(value)
  }
}
export function IsValidNationalNo(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isValidNationalNo',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidNationalNoConstraint,
    });
  };
}
