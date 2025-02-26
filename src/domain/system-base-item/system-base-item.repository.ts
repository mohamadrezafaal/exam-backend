import { SystemBaseItem } from "@/entities/system-base-item.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


export class SystemBaseItemRepository extends Repository<SystemBaseItem> {
    constructor(
        @InjectRepository(SystemBaseItem)
        private readonly repository: Repository<SystemBaseItem>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

}