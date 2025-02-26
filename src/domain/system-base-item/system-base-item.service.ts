import {Injectable} from '@nestjs/common';
import {InjectMapper} from '@automapper/nestjs';
import {Mapper} from '@automapper/core';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import { SystemBaseItem } from '@/entities/system-base-item.entity';
import { SystemBaseItemRepository } from '@/domain/system-base-item/system-base-item.repository';

@Injectable()
export class SystemBaseItemService extends TypeOrmCrudService<SystemBaseItem> {

    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        private readonly repository: SystemBaseItemRepository,
    ) {
        super(repository);
    }
}