import { Injectable } from '@nestjs/common';
import { ApiClientService } from '@/api-client/api-client.service';


@Injectable()
export class PermissionService {
    constructor(private httpService: ApiClientService) {}

    async userHasPermission(userId: string, systemId: number, resourceCode: number, actionId: number, token: string): Promise<boolean> {
        const data = {
            userId: userId,
            systemId: systemId,
            resourceCode: resourceCode,
            actionId: actionId
        }
        const result = await this.httpService.post('auth/check/permission', data, null).toPromise();
        console.log(result);
        
        if(result) {
            return true;
        }else {
            return false;
        }
    }
}