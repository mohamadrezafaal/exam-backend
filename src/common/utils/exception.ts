import {BadRequestException, HttpException, HttpStatus, ServiceUnavailableException} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

export function invalidRequestData(entity: string, uniqueMessage = '') {
  let message = `The entity does not exist`;
  if (uniqueMessage) {
    message = uniqueMessage;
  }
  return new HttpException(
    {
      error: 'INVALID_REQUEST_DATA',
      message,
      args: { entity },
    },
    HttpStatus.BAD_REQUEST,
  );
}

export function deletePermissionDenied(entity: string, reference: string) {
  return new HttpException(
    {
      error: 'DELETE_PERMISSION_DENIED',
      message: `The entity can not deleted due to a reference`,
      args: { entity, reference },
    },
    HttpStatus.BAD_REQUEST,
  );
}

export const requestPermissionDenied = new BadRequestException(
  'Your permission to do this action has denied',
  'REQUEST_PERMISSION_DENIED',
);

export const requestedInfoAlreadyExists = new BadRequestException(
  'There is already a record with requested info',
  'REQUESTED_INFO_ALREADY_EXISTS',
);
export class RequestedInfoNotFoundException extends NotFoundException {
  constructor() {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      message: [{ message: 'اطلاعات درخواستی یافت نشد' }],
      error: 'REQUESTED_INFO_NOT_FOUND',
    });
  }
}

export class OperationNotSuccessfulException extends BadRequestException {
  constructor(message?: string) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [{ message: message ? message : 'عملیات موفقیت آمیز نبود' }],
      error: 'OPERATION_NOT_SUCCESSFUL',
    });
  }
}

export class RequestNotPossibleException extends BadRequestException {
  constructor(message?: string) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        { message: message ? message : 'انجام این عملیات امکان پذیر نیست' },
      ],
      error: 'REQUEST_NOT_POSSIBLE',
    });
  }
}

export class ForbiddenRequest extends BadRequestException {
  constructor(message?: string) {
    super({
      statusCode: HttpStatus.FORBIDDEN,
      message: [
        { message: message ? message : 'دسترسی غیرمجاز' },
      ],
      error: 'FORBIDDEN',
    });
  }
}

export class TargetServiceNotResponseException extends ServiceUnavailableException {
  constructor(message?: string) {
    super({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      message: [
        { message: message ? message : 'سرویس مبدا پاسخ گو نمی باشد' },
      ],
      error: 'SERVICE_UNAVAILABLE',
    });
  }
}

export class ValidationException extends BadRequestException {
  constructor(errors?: any) {
    const result = errors.map((error) => ({
      property: error.property,
      message: error.constraints[Object.keys(error.constraints)[0]],
    }));

    super(result);
  }
}
