import { InjectRepository } from '@nestjs/typeorm';
import { assert } from 'console';
import * as sql from 'mssql';
import { OrganPost } from '@/entities/organ-post.entity';
import { Repository } from 'typeorm';
import '@/common/typeorm/select-query-builder-extentions';

export class OrganPostRepository extends Repository<OrganPost> {
  constructor(
    @InjectRepository(OrganPost)
    private readonly repository: Repository<OrganPost>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }



  // getPostByOrganId(organId: number) {
  //   assert(typeof(organId) === 'number' && !Number.isNaN(organId))
  //   const rawData = this.repository.manager
  //     .query(
  //       `select a.*,case when b.id is null then 0 else 1 end IsChecked 
  //       from organ.tb_VirtualPost a left outer join organ.tb_VirtualOrganPost b on a.Id = b.PostId and b.OrganId = ${organId}`
  //     )
  //     return rawData;
  // }

  async getPostByOrganId(organId: number) {
    assert(typeof organId === 'number' && !Number.isNaN(organId));
    const response = await (this.manager.connection.driver as any).master
      .request()
      .input('OrganId', sql.Int, organId)
      .execute('organ.usp_GetVirtualOrganPost');

    return response.recordset.map((x) => x);
  }

}

