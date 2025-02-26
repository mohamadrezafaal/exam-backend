import {LoginOauthDto} from "@/auth/dto/login.oauth.dto";
import {Inject, Injectable} from '@nestjs/common';
import * as process from 'process';
import {REQUEST} from "@nestjs/core";
import {Request} from "express";
import {HttpClientService} from "@/http-client/http-client.service";
import {RequestContext} from "@/common/utils/request-context";

interface OrganRes {
    id: number
    Title: string
}

@Injectable()
export class OauthClientService {
    constructor(protected httpService: HttpClientService,
                @Inject(REQUEST) private readonly request: Request
    ) {}
    async getNotification() {
        const userSeq = RequestContext.currentUser()['userSeq']
        return await this.httpService.get(`${process.env.OAUTH_BACKEND_URL}/system-notification/get-process-handling/${userSeq}`)
    }
    async updateReadNotification(id) {
        return await this.httpService.put(`${process.env.OAUTH_BACKEND_URL}/system-notification/update-read-process-handling`,{id:id})
    }

    async updateNotification(body) {
        return await this.httpService.put(`${process.env.OAUTH_BACKEND_URL}/system-notification/update-process-handling`,
            {
                userSeq: body.userSeq,
                systemResourceId: body.systemResourceId,
                endTime: body.endTime,
                startTime: body.startTime,
                isSuccess: body.isSuccess,
            },{})
    }

    async setNotification(body) {
        return await this.httpService.post(`${process.env.OAUTH_BACKEND_URL}/system-notification/create-process-handling`, body,{})
    }

    async initialize(query, response) {

        const oauthResponse = await this.httpService.post(`${process.env.OAUTH_BACKEND_URL}/client/token`,
            {
                clientId: process.env.SYSTEM_ID,
                clientSecret: '123',
                codeChallenge: query.code_challenge,
                state: query.state,
            }, {});

        response.redirect(`${process.env.FRONT_URL}auth?token=${oauthResponse.data.data.access_token}&refresh_token=${oauthResponse.data.data.refresh_token}`)
    }

    async loginOauth(body: LoginOauthDto) {
        const request: LoginOauthDto = {
            username: body.username,
            password: body.password,
            clientId: process.env.SYSTEM_ID,
            grant_type: 'password',
        };

        return this.httpService.post(
            `${process.env.OAUTH_BACKEND_URL}/auth/subsystem/login`,
            request);

    };
    
    async findSpecificVoluteerByNationalNumber(nationalNo) {
       return this.httpService.get(`${process.env.OAUTH_BACKEND_URL}/personel-finder/volunteer/info/${nationalNo}`);
        
    }

    async getUserMenu() {
        return this.httpService.get(`${process.env.OAUTH_BACKEND_URL}/user/system/menu/${process.env.SYSTEM_ID}`);
    }
    
    async getPermissions() {
        return this.httpService.get(`${process.env.OAUTH_BACKEND_URL}/user/permissions/${process.env.SYSTEM_ID}`);
    }
    async getProcess(systemProcessId:number){
        return await this.httpService.get(`${process.env.OAUTH_BACKEND_URL}/user/getAllProccess/info/${systemProcessId}`)
    }
    async getAllProcess(systemId:number): Promise<any> {
        return await this.httpService.get(`${process.env.OAUTH_BACKEND_URL}/client/system/process/${systemId}`);
    }
    async getAllResource(systemId:number): Promise<any> {
        return await this.httpService.get(`${process.env.OAUTH_BACKEND_URL}/client/system/resource/${systemId}`);
    }
    async getAllSystem(): Promise<any> {
        return  this.httpService.get(`${process.env.OAUTH_BACKEND_URL}/user/getAllSystem/info`);
    }

    async getOrganId(): Promise<OrganRes> {
        return await this.httpService.get(`${process.env.OAUTH_BACKEND_URL}/user/organ/organId`);
    }
    async getSystemNotification(systemId:number): Promise<any> {
        return await this.httpService.get(`${process.env.OAUTH_BACKEND_URL}/system-notification/system/${systemId}`);
    }
    async insertToSeenNotification(systemId:number,body: any) {
        return await this.httpService.post(
            `${process.env.OAUTH_BACKEND_URL}/system-notification/system/${systemId}`,
            body);
    
    };
    async GetUserOrganScopeWithoutParent() {
        return await this.httpService.get(`${process.env.OAUTH_BACKEND_URL}/user/getUserOrgans/withoutParent`);
    }

    async GetUserForceScope() {
        return await this.httpService.get(`${process.env.OAUTH_BACKEND_URL}/user/getUserForceScope`);
    }

    async getSystemProcessDetail(processId) {
        return await this.httpService.get(`${process.env.OAUTH_BACKEND_URL}/user/getSystemProcessDetail/${processId}`);
    }
}


