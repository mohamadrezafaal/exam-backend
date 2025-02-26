import { Injectable } from "@nestjs/common";
import { WorkflowService } from "../workflow.service";
import { CloseTiketDto } from "./dto/close-tiket.dto";
import { CreateTiketDto } from "./dto/create-tiket.dto";
import { UpdateTiketDto } from "./dto/update-tiket.dto";
import { StartTiketDto } from "./dto/start-tiket.dto";


@Injectable()
export class TiketService
{
    constructor(private readonly workflowService: WorkflowService) {
        // super(workflowService);
    }
    async getTiket(tiketId: number) {

        return this.workflowService.getTiket(tiketId)
    }

    async getTiketAttachment(tiketId: number) {

        return this.workflowService.getTiketAttachment(tiketId)
    }

    async getTiketComment(tiketId: string) {

        return this.workflowService.getTiketComment(tiketId)
    }

    async getUserTiketCartable(
        systemId: number,

    ) {

        return this.workflowService.getUserTiketCartable(systemId)
    }

    async createTiket(body: CreateTiketDto) {
        return this.workflowService
            .createTiket(body)

    }

    async deleteTiket(tiketId: number) {

        return this.workflowService.deleteTiket(tiketId)
    }

    async deleteTiketAttachment(documentId: string) {

        return this.workflowService.deleteTiketAttachment(documentId)
    }

    async closeTiket(body: CloseTiketDto) {
        return this.workflowService
            .closeTiket(body)

    }

    async updateTiket(body: UpdateTiketDto) {
        return this.workflowService
            .updateTiket(body);

    }

    async getAllTikets(
        systemId: number,
    ) {
        return this.workflowService.getAllTikets(systemId)
    }

    async getSystemTiket(
        systemId: number
    ) {
        return this.workflowService.getSystemTiket(systemId)
    }

    async sendTiket(body: StartTiketDto) {
        return this.workflowService
            .sendTiket(body)
    }

    async getTiketDetail(tiketId) {
        return this.workflowService
            .getTiketDetail(tiketId)
    }

}
