import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentAuthorization = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
        'Content-Type': 'application/json',
        Authorization: `${request.headers['authorization']}`
      }
  },
);