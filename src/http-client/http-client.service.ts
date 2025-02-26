import {Inject, Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {CoreService} from "@/common/services/core.service";
import {LoggerService} from "@/common/services/logger.service";
import {REQUEST} from "@nestjs/core";
import {Request} from "express";
import * as https from 'https'

@Injectable()
export class HttpClientService extends CoreService { 
    agent= new https.Agent({
        rejectUnauthorized:false
    })

    constructor(protected httpService: HttpService,
                protected loggerService: LoggerService,
                @Inject(REQUEST) private readonly request: Request) {
        super(httpService, loggerService)
    }

    public get(url: string, config?: any): Promise<any> {
        if (config) {
            return this.httpService.axiosRef.get(url, {...config,httpsAgent:this.agent}).catch((error)=>{
                return error
            })
        } else {
            return this.httpService.axiosRef.get(url, {
                httpsAgent:this.agent,
                headers: {
                    Authorization: this.request.headers.authorization,
                },
            }).catch((error)=>{
                return error
            })
        }
    }
    public post(url: string, data: any, config?: any): Promise<any> {

        if (config) {
            const resulst = this.httpService.axiosRef.post(url, data, {...config,httpsAgent:this.agent}).catch((error)=>{
                return error
            })
            return resulst
        } else {
            return this.httpService.axiosRef.post(url, data, {
                httpsAgent:this.agent,
                headers: {
                    Authorization: this.request.headers.authorization,
                },
            }).catch((error)=>{
                return error
            })
        }
    }
    public put(url: string, data: any, config?: any): Promise<any> {
        if (config) {
            return this.httpService.axiosRef.put(url, data, {...config,httpsAgent:this.agent}).catch((error)=>{
                return error
            })
        } else {
            return this.httpService
                .axiosRef.put(url, data, {
                    httpsAgent:this.agent,
                    headers: {
                        Authorization: this.request.headers.authorization,
                    },
                }).catch((error)=>{
                    return error
                })
        }
    }

    public delete(url: string, config?: any): Promise<any> {
        if (config) {
            return this.httpService.axiosRef.delete(url, {...config,httpsAgent:this.agent}).catch((error)=>{
                return error
            })
        } else {
            return this.httpService.axiosRef.delete(url, {
                httpsAgent:this.agent,
                headers: {
                    Authorization: this.request.headers.authorization,
                },
            }).catch((error)=>{
                return error
            })
        }
    }
}