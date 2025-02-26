import { BadGatewayException, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env', '.env'],
    }),
  ],
})
export class ConfigServerModule {}
