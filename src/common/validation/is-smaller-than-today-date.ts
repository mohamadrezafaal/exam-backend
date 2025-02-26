import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';

export function IsSmallerThanTodayDate<T>(validationOptions?: ValidationOptions) {
    return function (object: unknown, propertyName: string) {
        registerDecorator({
            name: 'isSmallerThanTodayDate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsSmallerThanTodayDateConstraint,
        });
    };
}

@ValidatorConstraint({
    name: 'isSmallerThanTodayDateConstraint',
    async: true,
})
@Injectable()
export class IsSmallerThanTodayDateConstraint implements ValidatorConstraintInterface {
    constructor() {}

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'تاریخ باید کوچکتر یا مساوی تاریخ امروز باشد';
    }

    async validate(
        value: Date,
        validationArguments?: ValidationArguments,
    ): Promise<boolean> {
        const valueDate = new Date(value.setHours(0, 0, 0, 0));
        const todayDate = new Date(new Date().setHours(0, 0, 0, 0));
        return valueDate <= todayDate;
    }


}
