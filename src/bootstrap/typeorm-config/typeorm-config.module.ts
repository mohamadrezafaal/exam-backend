import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';
import {CustomNamingStrategy} from './custom.naming.strategy';
import {AuditedEntitySubscriber} from "@/common/typeorm/audited-entity.subscriber";
import {addTransactionalDataSource} from 'typeorm-transactional';
import {DataSource} from 'typeorm';
import {LogAuditingSubscriber} from "@/common/typeorm/log-auditing.subscriber";
import {EncryptionHelper} from "@/common/utils/encryption-helper";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const encryptionHelper: EncryptionHelper = new EncryptionHelper()
                return {
                    type: 'postgres',
                    host: configService.get('DB_URL'), // process.env.DB_URL,
                    //port: parseInt(process.env.DB_PORT),
                    // username: encryptionHelper.decryptSHA256(configService.get('DB_USERNAME'), encryptionHelper.getSecretKey()), //process.env.DB_USERNAME,
                    // password: encryptionHelper.decryptSHA256(configService.get('DB_PASSWORD'), encryptionHelper.getSecretKey()), //process.env.DB_PASSWORD,
                    username: configService.get('DB_USERNAME'), //process.env.DB_USERNAME,
                    password: configService.get('DB_PASSWORD'), //process.env.DB_PASSWORD,
                    database: configService.get('DB_DATABASE'), //process.env.DB_DATABASE,
                    entities: [__dirname + '/../../entities/*.entity{.ts,.js}'],
                    synchronize: configService.get('CREATE_DB') === 'true', //process.env.CREATE_DB === 'true',
                    namingStrategy: new CustomNamingStrategy(),
                    extra: {
                        trustServerCertificate: true,
                    },
                    logging: ['query'],
                    migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
                    migrationsTableName: 'migrations',
                    migrationsRun: false,
                    subscribers: [AuditedEntitySubscriber, LogAuditingSubscriber]
                }
            }, async dataSourceFactory(options) {
                if (!options) {
                    throw new Error('Invalid options passed')
                }
                return addTransactionalDataSource(new DataSource(options))
            }
        }),
    ]
})
export class TypeormConfigModule {
}
