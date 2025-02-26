import {HttpStatus, Injectable, Logger} from '@nestjs/common';
import {LogCase, LogTypes} from '../types/logger';
import {HttpException} from '@nestjs/common/exceptions/http.exception';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class LoggerService {
    constructor(private configService: ConfigService,
    ) {
    }

    private readonly logger = new Logger(LoggerService.name);

    logRequest(logType: LogTypes, {method, url, body, headers, user}) {
        const timestamp = Date.now();
        const uniqueId = `${timestamp}${Math.floor(Math.random() * 1000)}`;
        let userToLog = {...user};
        let headersToLog = {...headers};
        if (userToLog['permissions']) {
            delete userToLog['permissions']
        }

        if (headersToLog['authorization']) {
            delete headersToLog['authorization']
        }
        if (headersToLog['Authorization']) {
            delete headersToLog['Authorization']
        }
        const ctx = {
            logType,
            thread: `${this.configService.get('app.name')}.thr-${uniqueId}`,
            loggerName: LoggerService.name,
            msgId: `${uniqueId}`,
            action: url,
            case: LogCase.Start,
            domain: headers.host,
            method,
            timestamp,
            userToLog,
        };
        const message = `Request - ${method} - ${url}`;
        if(!ctx.action.includes("/notification/send-message")){
            this.logger.log({
                ...ctx,
                message,
                body,
                headersToLog,
                value: undefined,
            });
        }
        return ctx;
    }

    logResponse(ctx, body, {statusCode}) {
        const message = `Response - ${statusCode} - ${ctx.method} - ${ctx.action}`;
        ctx.case = LogCase.End;
        ctx.elapse = `${Date.now() - ctx.timestamp}`;

        // if (body == null) {
        //     this.logger.log({
        //         ...ctx,
        //         statusCode,
        //         message,
        //         value: undefined,
        //     });
        // } else {
        //     this.logger.log({
        //         ...ctx,
        //         statusCode,
        //         message,
        //         body,
        //         value: undefined,
        //     });
        // }

        // اگر api دانلود فایل بود بافر دریافت شده نباید در لاگ نوشته شود، چون همین نوشتن باعث زیاد شدن response time می شود
        if (ctx.method == "get" && ctx.action.includes(this.configService.get('FILE_MANAGER_BACKEND_URL'))) {
            this.logger.log({
                ...ctx,
                statusCode,
                message,
                value: undefined,
            });
        }
        else if((ctx.method == "GET"|| ctx.method == "POST" )&&  (ctx.action.includes("/client/token")|| ctx.action.includes("/oauth/client") || ctx.action.includes("/notification/send-message")||ctx.action.includes('/workflow/') ) ){
            this.logger.log({
                ...ctx,
                statusCode,
                message,
                value: undefined,
            });
        }
        else if (ctx.method == "get" && ctx.action.includes("user/getUserOrgans/withoutParent")) { // خروجی این متد زیاد است
            this.logger.log({
                ...ctx,
                statusCode,
                message,
                value: undefined,
            });
        }
         else if (ctx.method == "DELETE" && ctx.action.includes("quota-work-flow")) { // خروجی این متد زیاد است
            this.logger.log({
                ...ctx,
                statusCode,
                message,
                value: undefined,
            });
        } else if (ctx.method == "GET" && ctx.action.includes("get-by-personnel-and-organ-id")) { // خروجی این متد زیاد است
            this.logger.log({
                ...ctx,
                statusCode,
                message,
                value: undefined,
            });
        } else {
            this.logger.log({
                ...ctx,
                statusCode,
                message,
                body,
                value: undefined,
            });
        }

    }

    logHttpError(ctx, error) {
        ctx.case = LogCase.Exception;
        ctx.elapse = `${Date.now() - ctx.timestamp}`;
        if (error instanceof HttpException) {
            const statusCode = error.getStatus();
            const message = `Response - ${statusCode} - ${ctx.method} - ${ctx.action}`;
            if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
                this.logger.error(
                    {
                        ...ctx,
                        statusCode,
                        message,
                        error,
                        value: undefined,
                    },
                    error.stack,
                );
            } else {
                this.logger.warn({
                    ...ctx,
                    error,
                    statusCode,
                    message,
                    value: undefined,
                });
            }
        } else {
            this.logger.error(
                {
                    ...ctx,
                    statusCode: 500,
                    message: `Response - ${ctx.method} - ${ctx.action}`,
                    value: undefined,
                },
                error.stack,
            );
        }
    }

    logServiceError(ctx, status, error) {
        const message = `Response - ${status} - ${ctx.method} - ${ctx.action}`;
        ctx.case = LogCase.Exception;
        ctx.elapse = `${Date.now() - ctx.timestamp}`;
        this.logger.error(
            {
                ...ctx,
                statusCode: status,
                message,
                value: undefined,
            },
            error,
        );
    }
}
