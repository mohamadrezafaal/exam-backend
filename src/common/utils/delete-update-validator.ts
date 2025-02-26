import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from './exception';
import {Request} from "express";

export const DeleteUpdateValidator = async <T extends object>(
  entity: ClassConstructor<T>,
  obj: object,
  request: Request,
) => {

  const groups = [];
  groups.push("ValidWorkflowStateForDeleteOrUpdate");

  const objInstance = plainToClass(entity, obj, { groups: groups });
  const errors = await validate(objInstance, { groups: groups });
  if (errors.length > 0) {
    throw new ValidationException(errors);
  }
};
