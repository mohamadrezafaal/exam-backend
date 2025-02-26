import {WorkflowService} from './workflow.service';
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put, Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import {Request, Response} from 'express';
import {StartWorkFlowDto} from './dto/start-workflow.dto';
import {ApiBearerAuth, ApiQuery, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '../../auth/guards/jwt-guard.guard';
import {Pagination} from "../../common/decorators/pagination.decorator";
import {PageLimit} from "../../common/decorators/limit.decorator";
import {Filter} from "../../common/decorators/filter.decorator";
import {Sort} from "../../common/decorators/sort.decorator";
import {SortParam} from "../../common/dto/request-params/sort-param";
import {UpdateWorkflowDefaultTextDto} from "@/external-client/workflow/dto/update-workflow-default-text.dto";

@Controller('workflow')
@ApiTags('workflow')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('sso-auth')
export class WorkflowController {
    constructor(private service: WorkflowService) {
    }

    @Get('process')
    async getSystemProcess(@Res() res: Response) {
        const allStatus: any = await this.service.getSystemProcess(process.env.SYSTEM_ID);
        return res.status(HttpStatus.OK).json(allStatus.data);
    }

    @Get('default-text-by-system-process/:systemProcessId')
    async getDefaultTextBySystemProcessId(
        @Param('systemProcessId') systemProcessId: number,
        @Res() res: Response,
    ) {
        const allStatus: any = await this.service.getDefaultTextBySystemProcessId(systemProcessId);
        return res.status(HttpStatus.OK).json(allStatus.data);
    }
    @Post('default-text/')
    async createDefaultText(
        @Body() body,
        @Res() res: Response,
    ) {
        const allStatus: any = await this.service.createDefaultText(body);
        if(!allStatus.data)
            throw new BadRequestException('ساختن متن پیش فرض ناموفق بود')
        return res.status(HttpStatus.OK).json(allStatus.data);
    }

    @Get('default-text/:id')
    async getOneDefaultText(
        @Param('id') id: number,
        @Res() res: Response,
    ) {
        const allStatus: any = await this.service.getOneDefaultText(id);
        return res.status(HttpStatus.OK).json(allStatus.data);
    }

    @Get('default-text/')
    @ApiQuery({name:'systemProcessId',required:false})
    async getAllDefaultText(
        @Res() res: Response,
        @Query('systemProcessId') systemProcessId:number,
        @Pagination() page,
        @PageLimit() pageLimit,
    ) {
        const allStatus: any = await this.service.getAllDefaultText(systemProcessId,page,pageLimit);
        return res.status(HttpStatus.OK).json(allStatus.data.data);
    }

    @Put('default-text/')
    async updateDefaultText(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: UpdateWorkflowDefaultTextDto,
    ) {
        const allStatus: any = await this.service.updateDefaultText(body);
        return res.status(HttpStatus.OK).json(allStatus.data);
    }

    @Delete('default-text/:id')
    async deleteDefaultText(
        @Param('id') id: number,
        @Res() res: Response,
    ) {
        const allStatus: any = await this.service.deleteDefaultText(+id);
        return res.status(HttpStatus.OK).json(allStatus.data);
    }

    @Get('confirm-organ/:processId')
    async getConfirmOrgan(
        @Param('processId') processId: number,
        @Res() res: Response,
    ) {
        const allStatus: any = await this.service.getConfirmOrgan(processId);
        return res.status(HttpStatus.OK).json(allStatus.data);
    }

    @Post('create')
    async createWorkflow(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body,
    ) {
        let promise: any = await this.service.createWorkflow(body);
        return res.status(HttpStatus.OK).json(promise.data);
    }

    @Put('update')
    async updateWorkflow(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body,
    ) {
        let promise = await this.service.updateWorkflow(body);
        return res.status(HttpStatus.OK).json(promise.data);
    }

    @Post('start')
    async startWorkflow(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: StartWorkFlowDto,
    ) {
        let promise = await this.service.startWorkflow(body);
        return res.status(HttpStatus.OK).json(promise.data);
    }

    @Get('detail/:processId/:workflowId')
    async getWorkFlowDetail(
        @Res() res: Response,
        @Param('processId') processId,
        @Param('workflowId') workflowId,
    ) {
        const allStatus: any = await this.service.getWorkFlowDetail(processId, workflowId);
        return res.status(HttpStatus.OK).json(allStatus.data);
    }

    @Get('detail/:workflowId')
    async getWorkFlowData(@Res() res: Response, @Param('workflowId') workflowId) {
        const allStatus: any = await this.service.getWorkFlowData(workflowId);
        return res.status(HttpStatus.OK).json(allStatus.data);
    }

    @Get('all')
    async getAllWorkflows(
        @Res() res: Response,
        @Pagination() page,
        @PageLimit() pageLimit,
        @Filter() filter,
        @Sort() sort: SortParam,
    ) {
        const allStatus: any = await this.service.getAllWorkflows(
            process.env.SYSTEM_ID,
        );
        return res.status(HttpStatus.OK).json(allStatus.data);
        // return await this.service.getAllWorkflows(
        //     process.env.SYSTEM_ID,
        //     res,
        //     filter,
        //     sort,
        //     page,
        //     pageLimit,
        // );
    }

    @Get('attachments/:workflowId')
    async getWorkflowAttachments(
        @Res() res: Response,
        @Param('workflowId') workflowId,
    ) {
        const allStatus: any = await this.service.getWorkflowAttachment(workflowId);
        return res.status(HttpStatus.OK).json(allStatus.data);
    }

    @Delete('attachments/:documentId')
    async deleteWorkflowAttachments(
        @Res() res: Response,
        @Param('documentId') documentId,
    ) {
        const allStatus: any = await this.service.deleteWorkflowAttachment(documentId)
        return res.status(HttpStatus.OK).json(allStatus.data);
    }

    @Delete('/delete/:workflowId')
    async deleteWorkflow(
        @Res() res: Response,
        @Param('workflowId') workflowId,
    ) {
        const allStatus: any = await this.service.deleteWorkflow(workflowId);
        return res.status(HttpStatus.OK).json(allStatus.data);
    }

    @Get('/get-status/:workflowId')
    async getStatus(
        @Param('workflowId') workflowId: number,
        @Res() res
    ) {

        const allStatus: any = await this.service.getWorkflowState(workflowId);
        return res.status(HttpStatus.OK).json(allStatus.data);
    }
}
