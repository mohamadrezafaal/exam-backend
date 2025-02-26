import {Module} from "@nestjs/common";
import {BullModule} from "@nestjs/bullmq";
import {ConfigService} from "@nestjs/config";
import {ConfigModule} from "@nestjs/config/dist/config.module";

@Module({
    imports: [
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService): Promise<any> => ({
                defaultJobOptions: {
                    attempts: 3,
                    removeOnComplete: true,
                    removeOnFail: true,
                },
                connection: {
                    db: configService.get<number>('REDIS_DB', 0),
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                    password: configService.get<string>('REDIS_PASS', "")
                },
            }),
            inject: [ConfigService],
        })
    ]
})

export class BullConfigModule {
}