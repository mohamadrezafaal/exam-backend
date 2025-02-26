import { REQUEST } from '@nestjs/core';
import { Scope } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiClientService {
    constructor(private http: HttpService) {
    }

    public get<T>(url: string, config): Observable<T> {
        return this.http.get(url, config).pipe(map(res => {
            return res.data;
        }));
    }

    public post<T>(url: string, data: any, config): Observable<T> {
        return this.http.post(url, data, config).pipe(
            map((res) => {
                return res.data;
            }),
        );
    }
}
