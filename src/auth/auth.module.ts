import { Module } from '@nestjs/common';
import { ApiClientModule } from '@/api-client/api-client.module';
import { SessionSerializer } from './session/session.serializer';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { HttpClientService } from '@/http-client/http-client.service';
import { HttpClientModule } from '@/http-client/http-client.module';

@Module({
  imports: [ApiClientModule,HttpClientModule],
  providers: [JwtStrategy, SessionSerializer, AuthService,HttpClientService],
})
export class AuthModule {}
