import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { ApiClientService } from '@/api-client/api-client.service';
import * as https from 'https'

@Injectable()
export class AuthService {
  agent= new https.Agent({
    rejectUnauthorized:false
})
  constructor(private apiClient: ApiClientService) {}

  async checkToken(
    userId: string,
    jti: string,
    clientId: string,
    systemId: string,
    headers: any
  ): Promise<boolean> {
    const data = {
      userId: userId,
      jti: jti,
      clientId: clientId,
      systemId: systemId,
    };
    const result = await this.apiClient
      .post(
        `${process.env.OAUTH_BACKEND_URL}/auth/check/subsystem/token`,
        data,
        {...headers,httpsAgent:this.agent},
      )
      .toPromise();
    return !!result;
  }
}
