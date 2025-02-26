import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const DEFAULT_LIMIT = 10;

export const PageLimit = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.query.limit) {
      const limit = Number.parseInt(request.query.limit);
      return Number.isInteger(limit) ? limit : DEFAULT_LIMIT;
    } else {
      return DEFAULT_LIMIT;
    }
  },
);
