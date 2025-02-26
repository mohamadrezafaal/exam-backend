import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const DEFAULT_PAGE = 1;

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.query.page) {
      const page = Number.parseInt(request.query.page);
      return Number.isInteger(page) ? page : DEFAULT_PAGE;
    } else {
      return DEFAULT_PAGE;
    }
  },
);
