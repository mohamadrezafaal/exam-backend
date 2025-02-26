import { HttpClientModule } from "@/http-client/http-client.module";
import { HttpClientService } from "@/http-client/http-client.service";
import { Module } from '@nestjs/common';
import { TiketController } from './tiket/tiket.controller';
import { TiketService } from './tiket/tiket.service';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';

@Module({
    imports: [HttpClientModule],
    controllers: [WorkflowController, TiketController],
    providers: [WorkflowService, HttpClientService,TiketService],
    exports: [WorkflowService,TiketService],

})
export class WorkflowModule {
}
