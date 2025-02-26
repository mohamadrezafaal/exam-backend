import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

Catch(HttpException);
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (exception instanceof UnauthorizedException) {
      response.redirect(
        `${process.env.OAUTH_BACKEND_URL}/client/system/authorize?clientId=${process.env.SYSTEM_ID}&redirect_url=${process.env.BACKEND_URL}/oauth/client`,
      );
    }
  }
}

// || exception instanceof ForbiddenException
