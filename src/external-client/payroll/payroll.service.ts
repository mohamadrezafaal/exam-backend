import {Inject, Injectable} from "@nestjs/common";
import {Request} from "express";
import {REQUEST} from "@nestjs/core";
import {HttpClientService} from "@/http-client/http-client.service";


@Injectable()
export class PayrollService {
    constructor(protected httpService: HttpClientService,
                @Inject(REQUEST) private readonly request: Request) {
    }

    async getLastPayroll() {
        return this.httpService.get(process.env.PAYROLL_BACKEND_URL + '/payroll-calculate-define/last-payroll')
    }
}