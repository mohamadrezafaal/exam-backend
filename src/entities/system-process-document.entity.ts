import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseInfoItem } from './base-info-item.entity';
import { AuditedEntity } from './common/audited.entity';

@Entity({
    schema: 'base',
    name: 'tb_SystemProcessDocument',
})
export class SystemProcessDocument extends AuditedEntity {
    @PrimaryGeneratedColumn('increment')
    @AutoMap()
    @ApiProperty({ required: false, readOnly: true })
    id: number;


    @PrimaryColumn({ type: 'int' })
    @AutoMap()
    @ApiProperty()
    systemProcessId: number;

    @Column({ type: 'int' })
    @AutoMap()
    @ApiProperty()
    documentId: number;

    @ManyToOne(
        () => BaseInfoItem,
        (baseInfoItem) => baseInfoItem.systemsProcessDocuments,
    )
    @JoinColumn({ name: 'DocumentId' })
    @AutoMap(() => BaseInfoItem)
    document: BaseInfoItem;

}
