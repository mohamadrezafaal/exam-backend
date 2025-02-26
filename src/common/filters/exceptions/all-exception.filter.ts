import { RequestContext } from "@/common/utils/request-context";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';
import { DataSource, TypeORMError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  async catch(exception: unknown, host: ArgumentsHost) {
    let currentUser = RequestContext.currentUser();
    const currentRequest:any = RequestContext.currentRequest();
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request:any = ctx.getRequest<Request>();
    var ip: string = currentRequest.ip.startsWith('::ffff:')?currentRequest.ip.replace(/^::ffff:/,''):currentRequest.ip;
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      //@ts-ignore
//      this.auditedLogService.insertAuditLogs('hrm','',actionTypeId,ip,currentUser?.userSeq??-1,request?.body?JSON.stringify(request?.body):null,null,LogLevelEnum.WARNING,exception.response.message[0].message,request.route?.path)
      response.status(statusCode).json(exception.getResponse());
    } else if (exception instanceof TypeORMError) {
      const responseBody = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: [
          { message: 'خطا در پایگاه داده، لطفا با مدیریت سیستم تماس بگیرید' },
        ],
        error: 'Database Error',
      };
      httpAdapter.reply(
        ctx.getResponse(),
        responseBody,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const responseBody = {
        statusCode: statusCode,
        message: [
          { message: 'خطا در عملیات، لطفا با مدیریت سیستم تماس بگیرید' },
        ],
        error: 'Internal Server Error',
      };
      httpAdapter.reply(
        ctx.getResponse(),
        responseBody,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    }

}
