import {Module} from '@nestjs/common';

import {FileManagerService} from './file-manager.service';
import {HttpClientModule} from "@/http-client/http-client.module";
import {HttpClientService} from "@/http-client/http-client.service";
import {FileManagerController} from "@/external-client/file-manager/file-manager.controller";

@Module({
    imports: [HttpClientModule],
    controllers: [FileManagerController],
    providers: [FileManagerService, HttpClientService],
    exports: [FileManagerService],

})
export class FileManagerModule {
}
