import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { UnprocessableEntityException } from '@nestjs/common/exceptions/unprocessable-entity.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (!data) {
          response.status(HttpStatus.BAD_REQUEST);
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: [{ message: 'موردی یافت نشد' }],
            error: 'Bad Request',
          };
        } else {
          if (!data.success && !data.status) {
            response.status(HttpStatus.OK);
            return data;
          }
          if (data.success) {
            switch (data.status) {
              case 200: {
                response.status(HttpStatus.OK);
                return data.data;
              }
              case 201: {
                response.status(HttpStatus.CREATED);
                return data.data;
              }
              case 202: {
                response.status(HttpStatus.ACCEPTED);
                return {};
              }
              case 204: {
                response.status(HttpStatus.NO_CONTENT);
                return {};
              }
              default: {
                response.status(HttpStatus.OK);
                return data;
              }
            }
          } else {
            switch (data.status) {
              case HttpStatus.BAD_REQUEST: {
                const exception = new BadRequestException([
                  { message: data.message },
                ]);
                response.status(HttpStatus.BAD_REQUEST);
                return exception.getResponse();
              }
              case HttpStatus.UNPROCESSABLE_ENTITY: {
                const exception = new UnprocessableEntityException([
                  { message: data.message },
                ]);
                response.status(HttpStatus.UNPROCESSABLE_ENTITY);
                return exception.getResponse();
              }
              case HttpStatus.NOT_FOUND: {
                const exception = new NotFoundException([
                  { message: data.message },
                ]);
                response.status(HttpStatus.NOT_FOUND);
                return exception.getResponse();
              }
              case HttpStatus.FAILED_DEPENDENCY: {
                const exception = new NotFoundException([
                  { message: data.message },
                ]);
                response.status(HttpStatus.FAILED_DEPENDENCY);
                return exception.getResponse();
              }
              default: {
                const exception = new BadRequestException([
                  { message: 'خطا در عملیات' },
                ]);
                response.status(HttpStatus.BAD_REQUEST);
                return exception.getResponse();
              }
            }
          }
        }
      }),
    );
  }
}
