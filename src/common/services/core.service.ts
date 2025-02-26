import { InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LoggerService } from './logger.service';
import { LogTypes } from '../types/logger';
import {TargetServiceNotResponseException} from "@/common/utils/exception";

export class CoreService {
  constructor(
    protected httpService: HttpService,
    protected loggerService: LoggerService,
  ) {
    this.httpService.axiosRef.interceptors.request.use(
      this.requestLogger.bind(this),
    );
    this.httpService.axiosRef.interceptors.response.use(
      this.responseLogger.bind(this),
      this.catchLogger.bind(this),
    );
  }

  private requestLogger(request: AxiosRequestConfig) {
    request._ctx = this.loggerService.logRequest(LogTypes.AUTH_REQUESTS, {
      method: request.method,
      url: `${request.baseURL}${request.url}`,
      body: request.data,
      headers: request.headers,
      user: null,
    });

    return request;
  }

  private responseLogger(res: AxiosResponse) {
    this.loggerService.logResponse(res.config._ctx, res.data, {
      statusCode: res.status,
    });
    return res;
  }

  private catchLogger(error: AxiosError) {
    const errorResponseData = error.response?.data;
    this.loggerService.logServiceError(
      error.config._ctx,
      error.response?.status || error.code,
      errorResponseData || error.stack,
    );
    throw new TargetServiceNotResponseException();
  }
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    _ctx?: any;
  }
}
