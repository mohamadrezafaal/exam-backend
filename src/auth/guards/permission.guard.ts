import { CanActivate, ExecutionContext, Inject, mixin, Type } from "@nestjs/common";
import { Action } from "./enums/action-permission.enum";
import { Resources } from "./enums/resource-permission.enum";
import { PermissionService } from "./permission.service";



const PermissionGuard = (resource: Resources, action: Action): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    constructor(@Inject('PermissionService') private readonly permissionSerivce: PermissionService){}
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user: any = request.user;
      if(user) {
        return await this.permissionSerivce.userHasPermission(user.id, +process.env.CLIENT_ID, resource, action, request.headers.authorization);
      }
    }
  }
  return mixin(PermissionGuardMixin);
}

export default PermissionGuard;