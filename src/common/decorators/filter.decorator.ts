import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/*
  Returns http query params of request as a filterObject and remove reserved keywords.
  Keywords are:
    * sortField,
    * sortOrder,
    * page,
    * limit,
*/
export const Filter = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const filterObject = { ...request.query };
    delete filterObject.sortField;
    delete filterObject.sortOrder;
    delete filterObject.page;
    delete filterObject.limit;
    return filterObject;

    // if (request.headers.filter) {
    //   const decodedRequest = decodeURI(
    //     Buffer.from(request.headers.filter, 'base64').toString() != 'null'
    //       ? Buffer.from(request.headers.filter, 'base64').toString()
    //       : '{}',
    //   );

    //   const tmp = {};
    //   const parsedRequest = JSON.parse(decodedRequest);
    //   Object.keys(parsedRequest).forEach((k) => {
    //     tmp[k] = parsedRequest[k] == '' ? null : parsedRequest[k];
    //   });

    //   return tmp;
    // } else return {};
  },
);
