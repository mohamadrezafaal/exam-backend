import {applyDecorators, SetMetadata} from "@nestjs/common";
export const DoNotLogResponseBody = () => applyDecorators(SetMetadata('ShouldLogResponseBody', false));