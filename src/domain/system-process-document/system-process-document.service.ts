import {Injectable} from '@nestjs/common';
import {InjectMapper} from '@automapper/nestjs';
import {Mapper} from '@automapper/core';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import { SystemProcessDocument } from '@/entities/system-process-document.entity';
import { SystemProcessDocumentRepository } from '@/domain/system-process-document/system-process-document.repository';

@Injectable()
export class SystemProcessDocumentService extends TypeOrmCrudService<SystemProcessDocument> {

    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        private readonly repository: SystemProcessDocumentRepository,
    ) {
        super(repository);
    }
}