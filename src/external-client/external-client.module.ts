import {Module} from "@nestjs/common";
import {HttpClientService} from "@/http-client/http-client.service";
import {HttpClientModule} from "@/http-client/http-client.module";
import {WorkflowModule} from "@/external-client/workflow/workflow.module";
import {FileManagerModule} from "@/external-client/file-manager/file-manager.module";
import {PayrollModule} from "@/external-client/payroll/payroll.module";
import {PayrollService} from "@/external-client/payroll/payroll.service";
import {WorkflowService} from "@/external-client/workflow/workflow.service";
import {FileManagerService} from "@/external-client/file-manager/file-manager.service";
import {OauthClientModule} from "@/external-client/oauth-client/oauth-client.module";
import {OauthClientService} from "@/external-client/oauth-client/oauth-client.service";

import { ExcelModule } from "./excel/excel.module";
import { ExcelService } from "./excel/excel.service";

@Module({
    imports: [
        HttpClientModule,
        WorkflowModule,
        FileManagerModule,
        PayrollModule,
        OauthClientModule,
        ExcelModule   
    ],
    providers: [
        HttpClientService,
        PayrollService,
        WorkflowService,
        FileManagerService,
        OauthClientService,
        ExcelService
    ],
    exports: [],
})
export class ExternalClientModule {}