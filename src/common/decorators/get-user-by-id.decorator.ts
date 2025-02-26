import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    delete request?.user['type'];
    delete request?.user['jti'];
    delete request?.user['iat'];
    delete request?.user['exp'];
    return request?.user;
  },
);