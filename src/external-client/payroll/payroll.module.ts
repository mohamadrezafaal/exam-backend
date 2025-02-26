import {Module} from '@nestjs/common';
import {PayrollService} from './payroll.service';
import {PayrollController} from './payroll.controller';
import {HttpClientModule} from "@/http-client/http-client.module";
import {HttpClientService} from "@/http-client/http-client.service";

@Module({
    imports: [HttpClientModule],
    controllers: [PayrollController],
    providers: [PayrollService, HttpClientService],
    exports: [PayrollService],

})
export class PayrollModule {
}
 