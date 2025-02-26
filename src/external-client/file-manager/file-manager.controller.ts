import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Req,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {Response} from 'express';
import {FilesInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from "@/auth/guards/jwt-guard.guard";
import {RequestNotPossibleException} from "@/common/utils/exception";
import {FileManagerService} from "@/external-client/file-manager/file-manager.service";
import {FileUploadErrorTypeEnum} from "@/common/enums/file-upload-error-type.enum";


@Controller('file-manager')
@ApiTags('file-manager')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('sso-auth')
export class FileManagerController {
    constructor(private service: FileManagerService) {
    }


    @Post('upload')
    @UseInterceptors(
        FilesInterceptor('files', 1, {
            storage: diskStorage({
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                },
            }),
            fileFilter: (req, file, cb) => {
                const fileSize = +(req.headers["Content-Length"] ?? req.headers["content-length"] ?? 0);
                if (
                    !file.originalname.match(
                        /\.(jpg|jpeg|png|pdf|xls|xlsx|doc|docx|ppt|pptx|PNG|JPG|JPEG|zip|rar|txt)$/
                    )
                ) {
                    req.body.fileUploadErrorType =
                        FileUploadErrorTypeEnum.EXTENSION_NOT_ALLOWED;
                    return cb(null, false);

                    //اگر بیشتر از 1 مگ بود جلوش رو بگیره و اکسپشن و خطای 400 بده. البته nginx هم بیشتر از 1 مگ رو جلوش رو میگیره که در اون صورت ارور 413 میده.
                } else if (fileSize > 1024 * 1024) {
                    req.body.fileUploadErrorType = FileUploadErrorTypeEnum.TOO_LARGE;
                    return cb(null, false);
                } else {
                    cb(null, true);
                }
            },
        }),
    )
    async uploadFile(
        @Res() res: Response,
        @Body() body,
        @UploadedFiles() files,
        @Req() req,
    ) {

        if (Object.hasOwnProperty.bind(req.body)("fileUploadErrorType")) {
            switch (req.body.fileUploadErrorType) {
                case FileUploadErrorTypeEnum.EXTENSION_NOT_ALLOWED:
                    throw new RequestNotPossibleException(
                        'فرمت این فایل پشتیبانی نمی شود',
                    );
                case FileUploadErrorTypeEnum.TOO_LARGE:
                    return res.status(HttpStatus.PAYLOAD_TOO_LARGE).json({
                        statusCode: HttpStatus.PAYLOAD_TOO_LARGE,
                        message: "حجم فایل از حد مجاز بیشتر است"
                    });
                default:
                    break;
            }
        } else {
        }


        try {
            const result = await this.service.uploadFile(files);
            const data = result.data;
            const code = data.statusCode;

            if (code == HttpStatus.CREATED) {
                return res.status(HttpStatus.CREATED).json({
                    statusCode: HttpStatus.CREATED,
                    message: 'آپلود فایل با موفقیت انجام شد',
                    data: data.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'آپلود فایل با خطا مواجه شد',
                    data: null,
                });
            }
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'آپلود فایل با خطا مواجه شد',
                data: null,
            });

        }
    }


    @Get(':streamId')
    async getFile(@Param('streamId') streamId: string, @Res() res: Response) {
        try {
            const result = await this.service.getFile(streamId);
            const data = result.data;
            const code = data.statusCode;
            if (code === HttpStatus.OK) {

                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    message: 'دریافت اطلاعات موفق بود',
                    data: result.data.data,
                });


                // res.header(
                //     'Content-Disposition',
                //     'attachment; filename=' + encodeURI(result.data.data.FileName),
                // );
                // res.header('Content-Type', '*/*');
                // return res.send(Buffer.from(result.data.data.FileStreamContent));
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'دانلود فایل با خطا مواجه شد',
                    data: null,
                });
            }
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'دانلود فایل با خطا مواجه شد',
                data: null,
            });
        }
    }


    // این API زمانی استفاده می شود که کاربر هنگام ایجاد ماده دستور، می خواهد یکی
    // از فایل هایی که آپلود کرده است را حذف کند
    @Delete(':streamIdList')
    async deleteFile(@Param('streamIdList') streamIdList: string, @Res() res: Response) {

        try {
            const result = await this.service.deleteFile(streamIdList);
            const data = result.data;
            const code = data.statusCode;
            if (code === HttpStatus.OK) {
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    message: 'حذف فایل با موفقیت انجام شد',
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'حذف فایل با خطا مواجه شد',
                });
            }
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'حذف فایل با خطا مواجه شد',
            });
        }

    }


}
