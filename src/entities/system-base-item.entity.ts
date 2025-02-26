import {Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn,} from 'typeorm';
import {BaseEntity} from './common/base.entity';
import {BaseInfoItem} from './base-info-item.entity';

@Entity({
    schema: 'base',
    name: 'tb_SystemBaseItem',
})
export class SystemBaseItem extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @PrimaryColumn()
    systemId: number;

    @PrimaryColumn({name: 'BaseItemId'})
    baseItemId: number;

    @ManyToOne(() => BaseInfoItem, (baseItem) => baseItem.systems, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'BaseItemId', referencedColumnName: 'id'})
    baseItem: BaseInfoItem;
}
