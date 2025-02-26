import '@/common/typeorm/select-query-builder-extentions';
import { RequestContext } from '@/common/utils/request-context';
import { Organ } from '@/entities/organ.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';

export class OrganRepository extends TreeRepository<Organ> {
  constructor(
    @InjectRepository(Organ)
    private readonly repository: TreeRepository<Organ>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findById(id: number) {
    const query = this.repository
      .createQueryBuilder('organ')
      .leftJoin('organ.organType', 'organType')
      .leftJoin('organ.force', 'force')
      .select([
        'organ.id',
        'organ.serialNumber',
        'organ.levelNumber',
        'organ.paragraphNumber',
        'organ.title',
        'organ.leftId',
        'organ.rightId',
        'organ.organCode',
        'organ.parentId',
        'organ.deactivateDate',
        'organ.organAddress',
        'organ.telephoneNumber',
        // OrganType
        'organType.name',
        'organType.id',
        // Force
        'force.id',
        'force.name',
      ])
      .where('organ.id = :id', { id: id });

    return query.getOne();
  }

  async getTrainingUnitByOperationalType(
    operationalIdList,
    checkUserOrganScope: boolean,
  ) {
    let operationalIds = '';

    if (operationalIdList === null || operationalIdList === undefined) {
      operationalIds = '';
    } else {
      operationalIds = operationalIdList.replaceAll(',', '&nbsp');
    }

    let currentUser = RequestContext.currentUser();
    const response = await (this.manager.connection.driver as any).master
      .request()
      .input('UserSeq', currentUser.userSeq)
      .input('OperationalIdList', operationalIds)
      .input('CheckUserOrganScope', checkUserOrganScope)
      .execute('duty.usp_GetTrainingUnitByOperationalType');

    return {
      data: response.recordset.map((x) => x),
      total: response.output.RowCount,
    };
  }
}
