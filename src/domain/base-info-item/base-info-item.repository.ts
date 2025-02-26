import {InjectRepository} from '@nestjs/typeorm';
import {ILike, Repository} from 'typeorm';
import '../../common/typeorm/select-query-builder-extentions';
import {BaseInfoItem} from '../../entities/base-info-item.entity';
import * as sql from 'mssql';

export class BaseInfoItemRepository extends Repository<BaseInfoItem> {
    constructor(
        @InjectRepository(BaseInfoItem)
        private readonly repository: Repository<BaseInfoItem>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }


    async findNameById(id: number) {
        return this.findOne({
            select: {
                id: true,
                name: true
            },
            where: {id: id},
        });
    }


    getAll(
        filterParam,
        sortParam,
        page: number,
        pageLimit: number,
        systemId: number,
        baseInfoId: number,
    ) {
        const query = this.repository
            .createQueryBuilder('baseItem')
            // .innerJoin('baseItem.systems', 'system')
            .where({baseInfoId: baseInfoId})
            // .andWhere('system.systemId = :systemId', {systemId: systemId})
            .andWhere({
                ...(filterParam?.name && {
                    name: ILike(`%${filterParam.name}%`),
                }),
            })
            .andWhere({
                ...(filterParam?.code && {
                    code: filterParam.code,
                }),
            })
            .andWhere({
                ...(filterParam?.isActive && {
                    isActive: filterParam.isActive,
                }),
            });

        query.addSort(sortParam).addPagination(pageLimit, page);

        return query.getManyAndCount();
    }

    getCustombaseId(
        filterParam,
    ) {
        const query = this.repository
            .createQueryBuilder('baseItem')
            .where(
                '(:flagBaseInfoId::bool IS NULL OR baseItem.baseInfoId IN (' +
                  (filterParam.baseInfoId != null
                    ? filterParam.baseInfoId.split(',')
                    : null) +
                  '))',
                {
                  flagBaseInfoId: filterParam.baseInfoId
                    ? filterParam.baseInfoId?.length > 0
                    : null,
        
                  baseInfoId: filterParam.baseInfoId,
                },
              );

        return query.getManyAndCount();
    }

    async getAllByCallStoredProcedure(
        filterParam,
        sortParam,
        page: number,
        pageLimit: number,
        systemId: number,
        baseInfoId: number,
    ) {
        const response = await (this.manager.connection.driver as any).master
            .request()
            .input('SystemId', sql.Int, systemId)
            .input('TableId', sql.Int, baseInfoId)
            .input('ItemCode', sql.Int, filterParam.code)
            .input('ItemName', sql.VarChar(200), filterParam.name)
            .input('IsActive', sql.Bit, filterParam.isActive)
            .input('PageNumber', sql.Int, page ?? 1)
            .input('RecordNumber', sql.Int, pageLimit ?? 10)
            .input('OrderByField', sql.VarChar(40), sortParam.field ?? 'ItemCode')
            .input('OrderOperator', sql.VarChar(40), sortParam.order ?? 'ASC')
            .output('RowCount', sql.Int)
            .execute('base.usp_GetBaseItem');

        return {
            data: response.recordset.map((x) => x),
            count: response.output.RowCount,
        };
    }
}
