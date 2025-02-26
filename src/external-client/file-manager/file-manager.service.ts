import {Inject, Injectable} from '@nestjs/common';
import {REQUEST} from "@nestjs/core";
import {Request} from "express";
import * as fs from 'fs';
import {HttpClientService} from "@/http-client/http-client.service";


@Injectable()
export class FileManagerService {

    constructor(protected httpService: HttpClientService,
        @Inject(REQUEST) private readonly request: Request) {
    }

    async uploadFile(files) {
        let FormData = require('form-data');
        let data = new FormData();
        for (const file of files) {
            const fullName = file.originalname.split('.');
            const ext = fullName.pop();
            const name = fullName.pop();
            const encodedName = encodeURI(name);
            data.append('files', fs.createReadStream(file.path), encodedName + "." + ext);
        }
    /*    return axios.post(process.env.FILE_MANAGER_BACKEND_URL + '/file-manager/upload', data,
            {
                headers: {
                    Authorization: this.request.headers.authorization,
                    ...data.getHeaders(),
                }
            }
        );*/
        return this.httpService.post(process.env.FILE_MANAGER_BACKEND_URL + '/file-manager/upload', data,
            {
                headers: {
                    Authorization: this.request.headers.authorization,
                    ...data.getHeaders(),
                }
            }
        );
    }

    async getFile(streamId: string) {
        return this.httpService.get(process.env.FILE_MANAGER_BACKEND_URL + '/file-manager/' + streamId)
    }

    // این API زمانی استفاده می شود که کاربر هنگام ایجاد ماده دستور، می خواهد یکی
    // از فایل هایی که آپلود کرده است را حذف کند
    // این  سرویس مستقیما از فرانت صدا زده می شود تا فایل از از دیتابیس Annex که فایل ها را ذخیره دارد حذف شود
    // همچنین هنگامی که در فرم ویرایش ماده دستور کاربر یک فایلی که آپلود کرده است را دیلیت می کند
    // این  سرویس از سایر سرویس های ماده دستور ها که در این پروژه وجود دارند صدا زده می شود
    // می توان یک یا چند streamId به این تابع پاس داد
    // یا یک streamId پاس داده شود و یا اگر چند streamId وجود دارد، با &nbsp از هم جدا شوند
    async deleteFile(streamIdList: string) {
        return this.httpService.delete(process.env.FILE_MANAGER_BACKEND_URL + '/file-manager/' + streamIdList)
    }

    async isValidFile(streamId: string) {
        return this.httpService.get(process.env.FILE_MANAGER_BACKEND_URL + '/file-manager/validate/' + streamId, {
            headers: {
                Authorization: this.request.headers.authorization,
            },
        })
    }

}
