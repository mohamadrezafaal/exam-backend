import { Module } from '@nestjs/common';
import { OauthClientService } from './oauth-client.service';
import { OauthClientController } from './oauth-client.controller';
import { ApiClientModule } from '@/api-client/api-client.module';
import { PermissionService } from '@/auth/guards/permission.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import {LoggerService} from "@/common/services/logger.service";
import {HttpClientModule} from "@/http-client/http-client.module";
import {WorkflowController} from "@/external-client/workflow/workflow.controller";
import {WorkflowService} from "@/external-client/workflow/workflow.service";
import {HttpClientService} from "@/http-client/http-client.service";

@Module({
  imports: [ApiClientModule, HttpClientModule],
  providers: [
    OauthClientService,
    HttpClientService,
    {
      provide: 'PermissionService',
      useClass: PermissionService,
    },
  ],
  controllers: [OauthClientController],
  exports: [
    OauthClientService,
],
})
export class OauthClientModule {}
