import { SystemProcessDocument } from "@/entities/system-process-document.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


export class SystemProcessDocumentRepository extends Repository<SystemProcessDocument> {
    constructor(
        @InjectRepository(SystemProcessDocument)
        private readonly repository: Repository<SystemProcessDocument>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

}