import {Module} from '@nestjs/common';
import {ConfigServerModule} from './config-server/config-server.module';
import {WinstonLoggerModule} from './winston/winston-logger.module';
import {PassportModule} from '@nestjs/passport';
import {LoggerService} from '@/common/services/logger.service';
import {MapperModule} from './mapper/mapper.module';
import {AuthModule} from '@/auth/auth.module';
import {TypeormConfigModule} from './typeorm-config/typeorm-config.module';
import {CacheConfigModule} from "@/bootstrap/cache-config/cache-config.module";
import {HttpConfigModule} from "@/bootstrap/http-config/http-config.module";
import {BullConfigModule} from "@/bootstrap/bull-config/bull-config.module";
import {EventEmitterConfigModule} from "@/bootstrap/eventEmitter-config/eventEmitter-config.module";

@Module({
    imports: [
        ConfigServerModule,
        TypeormConfigModule,
        PassportModule,
        WinstonLoggerModule,
        MapperModule,
        AuthModule,
        CacheConfigModule,
        HttpConfigModule,
        BullConfigModule,
        EventEmitterConfigModule
    ],
    providers: [LoggerService],
    exports: [LoggerService],
})
export class BootstrapModule {
}
