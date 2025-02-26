import {Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {HttpClientService} from "@/http-client/http-client.service";
import {LoggerService} from "@/common/services/logger.service";

@Module({
    imports: [HttpModule],
    providers: [HttpClientService,LoggerService],
    exports: [HttpClientService,LoggerService],
})
export class HttpClientModule {}
