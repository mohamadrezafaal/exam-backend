import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';
import { LogTypes } from '../types/logger';
import { Reflector } from '@nestjs/core';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private loggerService: LoggerService, private readonly reflector: Reflector) {
    }

    intercept(context: ExecutionContext, call$: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();

        const ctx = this.loggerService.logRequest(LogTypes.API_REQUESTS, req);
        // const shouldWriteResponseBodyInLog: boolean = (this.reflector.get('ShouldLogResponseBody', context.getHandler())) ?? true;

        return call$.handle().pipe(
            tap({
                next: (body) => {
                    this.loggerService.logResponse(ctx, body, res);

                    // if (shouldWriteResponseBodyInLog) {
                    //     this.loggerService.logResponse(ctx, body, res);
                    // } else {
                    //     this.loggerService.logResponse(ctx, null, res);
                    // }
                },
                error: (error) => {
                    this.loggerService.logHttpError(ctx, error);
                },
            }),
        );
    }
}
