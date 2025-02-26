import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SortParam } from '../dto/request-params/sort-param';

export interface SortInterface {
  sortOrder: 'asc' | 'desc' | undefined;
  sortField: string | null | undefined;
}

export const Sort = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const sortObject: SortParam = new SortParam();
    const query = request.query;
    if (query.sortField) {
      sortObject.field = query.sortField;
      sortObject.order = query.sortOrder === 'asc' ? 'asc' : 'desc';
    }
    return sortObject;
  },
);
