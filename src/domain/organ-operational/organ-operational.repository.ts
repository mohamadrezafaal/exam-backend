import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as sql from "mssql";
import "@/common/typeorm/select-query-builder-extentions";
import { OrganOperational } from "@/entities/organ-operational.entity";
import { assert } from "console";

export class OrganOperationalRepository extends Repository<OrganOperational> {
  constructor(
    @InjectRepository(OrganOperational)
    private readonly repository: Repository<OrganOperational>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  // findByOrganId(organId: number) {
  //   const query = this.repository
  //     .createQueryBuilder('organOperational')
  //     .leftJoin('organOperational.operational', 'operational')
  //     .leftJoin('organOperational.organ', 'organ')
  //     .select([
  //       'organOperational.id',
  //       'organOperational.organId',
  //       'organOperational.operationalId',
  //       'operational.id',
  //       'operational.name',
  //       'organ.id',
  //       'organ.title',
  //     ])
  //     .where('organOperational.organId = :organId', { organId: organId });

  //   return query.getOne();
  // }

  // getAllOperationalByOrganId(
  //   filterParam,
  //   sortParam: SortParam,
  //   page: number,
  //   pageLimit: number,
  //   organId: number,
  // ) {
  //   const query = this.repository
  //     .createQueryBuilder('organOperational')
  //     .leftJoin('organOperational.operational', 'operational')
  //     .leftJoin('organOperational.organ', 'organ')
  //     .select([
  //       'organOperational.id',
  //       'organOperational.organId',
  //       'organOperational.operationalId',
  //       'operational.id',
  //       'operational.name',
  //       'organ.id',
  //       'organ.title',
  //     ])
  //     .addDocumentedRecordWhereClause()
  //     .andWhere('organOperational.organId = :organId', { organId: organId });

  //   query.addSort(sortParam).addPagination(pageLimit, page);

  //   return query.getManyAndCount();
  // }

  // getOperationalByOrganId(organId: number) {
  //   assert(typeof organId === 'number' && !Number.isNaN(organId));
  //   const tableId = 80;
  //   const rawData = this.repository.manager.query(
  //     `select a.id,a.ItemName,case when b.id is null then 0 else 1 end IsChecked  
  //       from (
  //         select * from base.tb_BaseItem
  //         where TableId = ${tableId}
  //       ) a 
  //       left outer join 
  //         organ.tb_VirtualOrganOperational b on a.Id = b.OperationalId and b.OrganId =${organId}`,
  //   );
  //   return rawData;
  // }


    async getOperationalByOrganId(organId: number) {
    assert(typeof organId === 'number' && !Number.isNaN(organId));
    const response = await (this.manager.connection.driver as any).master
      .request()
      .input('OrganId', sql.Int, organId)
      .execute('organ.usp_GetVirtualOrganOperational');

    return response.recordset.map((x) => x);
  }
}
