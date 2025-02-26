import {HttpClientService} from "@/http-client/http-client.service";
import {Inject, Injectable} from "@nestjs/common";
import {REQUEST} from "@nestjs/core";
import {Request} from "express";
import {StartWorkFlowDto} from "./dto/start-workflow.dto";
import {WorkflowStateResponseDto} from "./dto/workflow-state-response.dto";
import {CloseTiketDto} from "./tiket/dto/close-tiket.dto";
import {UpdateTiketDto} from "./tiket/dto/update-tiket.dto";
import * as process from "process";


@Injectable()
export class WorkflowService {
    constructor(protected httpService: HttpClientService,
        @Inject(REQUEST) private readonly request: Request) { }


    async getSystemProcess(systemid: number) {
        return this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/workflow/system/' + systemid)
    }

    async getAllWorkflows(
        systemId: number,
    ) {
        return this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/workflow/all/' + systemId, {
            headers: {
                Authorization: this.request.headers.authorization,
                filter: this.request.headers.filter as string
            },
        })
    }
    async createDefaultText(body) {
        return this.httpService.post(`${process.env.WORKFLOW_BACKEND_URL}/workflow/default-text/` ,body)
    }
    async getDefaultTextBySystemProcessId(systemProcessId:number){
        return await this.httpService.get(`${process.env.WORKFLOW_BACKEND_URL}/workflow/default-text-by-system-process/${systemProcessId}`)
    }
    async getAllDefaultText(systemProcessId:number,page,pageLimit){
        const systemProcess:string = systemProcessId ? `&systemProcessId=${systemProcessId}` : ''
        return await this.httpService.get(`${process.env.WORKFLOW_BACKEND_URL}/workflow/default-text?page=${page}&pageLimit=${pageLimit}${systemProcess}`)
    }
    async getOneDefaultText(id:number){
        return await this.httpService.get(`${process.env.WORKFLOW_BACKEND_URL}/workflow/default-text/${id}`)
    }
    async updateDefaultText(body){
        return await this.httpService.put( `${process.env.WORKFLOW_BACKEND_URL}/workflow/default-text/`,body)
    }
    async deleteDefaultText(id:number){
        return await this.httpService.delete( `${process.env.WORKFLOW_BACKEND_URL}/workflow/default-text/${id}`)
    }

    async getWorkflowAttachment(workflowId: string) {
        return this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/workflow/attachments/' + workflowId)
    }

    async deleteWorkflowAttachment(documentId: string) {
        return this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/workflow/attachments/' + documentId)
    }

    async deleteWorkflow(workflowId: string) {
        return this.httpService.delete(process.env.WORKFLOW_BACKEND_URL + '/workflow/delete/' + workflowId)
    }

    async getConfirmOrgan(processId: number) {
        return await this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/workflow/confirm-organ/' + processId)
    }

    async createWorkflow(body: any) {
        return this.httpService
            .post(process.env.WORKFLOW_BACKEND_URL + '/workflow/create/', body)

    }

    async updateWorkflow(body: any) {
        return this.httpService
            .put(process.env.WORKFLOW_BACKEND_URL + '/workflow/update/', body);
    }

    async startWorkflow(
        body: StartWorkFlowDto,
    ) {
        return this.httpService
            .post(process.env.WORKFLOW_BACKEND_URL + '/workflow/start', body);
    }

    async getWorkFlowDetail(processId, workflowId) {
        return this.httpService.get(`${process.env.WORKFLOW_BACKEND_URL}/workflow/detail/${processId}/${workflowId}`)
    }

    async getWorkFlowData(workflowId) {
        return this.httpService.get(`${process.env.WORKFLOW_BACKEND_URL}/workflow/detail/${workflowId}`)
    }

    async getWorkflowState(workflowId: number): Promise<WorkflowStateResponseDto> {
        const _request = this.request;
        const url = `${process.env.WORKFLOW_BACKEND_URL}/workflow/${workflowId}/state`;
        const result = await this.httpService.get(url)

        if (result === null || result.data === null || result.data.data === null || result.data.data.length === 0) {
            return {
                exist: false,
                workFlowState: null,
                workFlowStateTitle: null
            };
        } else {
            return {
                exist: true,
                workFlowState: result.data.data[0].WorkFlowState,
                workFlowStateTitle: result.data.data[0].WorkFlowStateTitle
            };
        }

    }


    async getSystemProcessConfig(
        processId: number,
    ) {

        const url = `${process.env.WORKFLOW_BACKEND_URL}/workflow/get-system-process-config/${processId}`;
        const result = await this.httpService.get(url)

        if (result === null || result.data === null || result.data.data === null || result.data.data.length === 0) {
            return {
                exist: false,
                data: result.data.data,
            };
        } else {
            return {
                exist: true,
                data: result.data.data,
            };
        }

       // return this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/workflow/get-system-process-config/' + processId)
    }


    /*-----------------TIKET----------------------*/

    /*-----------------TIKET----------------------*/
    async getTiket(tiketId: number) {

        return this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/tiket/' + tiketId)
    }

    async getTiketAttachment(tiketId: number) {

        return this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/tiket/attachment/' + tiketId)
    }

    async getTiketComment(tiketId: string) {

        return this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/tiket/comment/' + tiketId)
    }

    async getUserTiketCartable(
        systemId: number,

    ) {

        return this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/tiket/userTiketCartable/' + systemId, {
            headers: {
                Authorization: this.request.headers.authorization,
                filter: this.request.headers.filter as string
            },
        })
    }

    async createTiket(body: any) {
        return this.httpService
            .post(process.env.WORKFLOW_BACKEND_URL + '/tiket/create/tiket', body, {
                headers: {
                    Authorization: this.request.headers.authorization,
                },
            })

    }

    async deleteTiket(tiketId: number) {

        return this.httpService.delete(process.env.WORKFLOW_BACKEND_URL + '/tiket/delete/' + tiketId, {
            headers: {
                Authorization: this.request.headers.authorization,
            },
        })
    }

    async deleteTiketAttachment(documentId: string) {

        return this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/tiket/attachment/' + documentId, {
            headers: {
                Authorization: this.request.headers.authorization,
            },
        })
    }

    async closeTiket(body: CloseTiketDto) {
        return this.httpService
            .post(process.env.WORKFLOW_BACKEND_URL + '/tiket/close/tiket', body, {
                headers: {
                    Authorization: this.request.headers.authorization,
                },
            })

    }

    async updateTiket(body: UpdateTiketDto) {
        return this.httpService
            .put(process.env.WORKFLOW_BACKEND_URL + '/tiket/update/', body, {
                headers: {
                    Authorization: this.request.headers.authorization,
                },
            });

    }

    async getAllTikets(
        systemId: number,
    ) {
        return this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/tiket/all/' + systemId, {
            headers: {
                Authorization: this.request.headers.authorization,
                filter: this.request.headers.filter as string
            },
        })
    }

    async getSystemTiket(
        systemId: number
    ) {

        return this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/tiket/system/' + systemId, {
            headers: {
                Authorization: this.request.headers.authorization
            },
        })
    }

    async sendTiket(body: any) {
        return this.httpService
            .post(process.env.WORKFLOW_BACKEND_URL + '/tiket/send/start', body, {
                headers: {
                    Authorization: this.request.headers.authorization,
                },
            })

    }

    async getTiketDetail(tiketId) {
        return this.httpService.get(process.env.WORKFLOW_BACKEND_URL + '/tiket/task/detail/' + tiketId)
    }

    /*---------------------------------------*/

}
