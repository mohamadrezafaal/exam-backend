import {createParamDecorator, ExecutionContext, HttpException, HttpStatus} from '@nestjs/common';
import {ValidateNationalNo} from "@/common/utils/validate-national-no";

export const NationalNoDecorator = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const nationalNo = request.query.nationalNo
        if (nationalNo &&
            !ValidateNationalNo(nationalNo)
        ) {
            throw new HttpException('کد ملی وارد شده نامعتبر می باشد.', HttpStatus.BAD_REQUEST)
        }else return nationalNo
    },
);