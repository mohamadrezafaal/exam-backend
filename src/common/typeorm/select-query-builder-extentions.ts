import {SelectQueryBuilder} from 'typeorm/query-builder/SelectQueryBuilder';
import {SortParam} from '../dto/request-params/sort-param';
import {In, IsNull, Not} from 'typeorm';
import {ChangeTypeEnum} from '../enums/change-type.enum';
import {RecordStatusEnum} from '../enums/record-status.enum';
import {RequestContext} from "@/common/utils/request-context";

declare module 'typeorm/query-builder/SelectQueryBuilder.js' {
    interface SelectQueryBuilder<Entity> {
        addPagination(
            this: SelectQueryBuilder<Entity>,
            pageLimit: number,
            page: number,
        );

        addSort(this: SelectQueryBuilder<Entity>, sortParam: SortParam);

        addDocumentedRecordWhereClause(this: SelectQueryBuilder<Entity>);

        addCommonOrderMatterExpressions(this: SelectQueryBuilder<Entity>, EntityAlias: String);

        addDocumentedRecordWhereClauseWithName(this: SelectQueryBuilder<Entity>, EntityAlias: String);

    }
}

SelectQueryBuilder.prototype.addPagination = function <Entity>(
    this: SelectQueryBuilder<Entity>,
    pageLimit: number,
    page: number,
): SelectQueryBuilder<Entity> {
    if (page != null && pageLimit != null) {
        if (pageLimit > 0 && page > 0) {
            this.skip((page - 1) * pageLimit);
            this.take(pageLimit);
        }
    }
    return this;
};

SelectQueryBuilder.prototype.addSort = function <Entity>(
    this: SelectQueryBuilder<Entity>,
    sortParam: SortParam,
): SelectQueryBuilder<Entity> {
    if (sortParam && sortParam?.field && sortParam?.order) {
        if (sortParam?.order?.toLowerCase() == 'asc')
            this.orderBy(`${sortParam.field}`, 'ASC');
        else this.orderBy(`${sortParam.field}`, 'DESC');
    }
    return this;
};

SelectQueryBuilder.prototype.addDocumentedRecordWhereClause = function <Entity>(
    this: SelectQueryBuilder<Entity>,
): SelectQueryBuilder<Entity> {
    this
        .where({nextId: IsNull()})
        .andWhere({
            changeTypeId: Not(ChangeTypeEnum.Cancel),
        })
        .andWhere({
            recordStatusId: In([
                RecordStatusEnum.Documented,
                RecordStatusEnum.Accepted,
            ]),
        });
    return this;
};


SelectQueryBuilder.prototype.addDocumentedRecordWhereClauseWithName = function <Entity>(
    this: SelectQueryBuilder<Entity>,
    EntityAlias: String
): SelectQueryBuilder<Entity> {
    this
        .andWhere('(' + EntityAlias + '.nextId IS NULL)')
        .andWhere('(' + EntityAlias + '.changeTypeId != :Cancel)',
            {
                Cancel: ChangeTypeEnum.Cancel
            })
        .andWhere('(' + EntityAlias + '.recordStatusId = :Accepted OR ' + EntityAlias + '.recordStatusId = :Documented)',
            {
                Accepted: RecordStatusEnum.Accepted,
                Documented: RecordStatusEnum.Documented,
            })
    return this;
};


SelectQueryBuilder.prototype.addCommonOrderMatterExpressions = function <Entity>(
    this: SelectQueryBuilder<Entity>,
    EntityAlias: String
): SelectQueryBuilder<Entity> {

    // تطابق ارگان هایی که شخص لاگین شده به آن ها دسترسی دارد با ارگان نفر برای دسترسی مشاهده جزییات ماده دستور
    let currentUser = RequestContext.currentUser();
    const userOrganId = currentUser.organId;

    this
        .leftJoin(EntityAlias + '.personal', 'personal')
        .leftJoin(EntityAlias + '.previous', 'previous') // برای ساخت متن توضیح تکیلی ماده دستور نیاز است
        .leftJoin(EntityAlias + '.order', 'order')
        .innerJoin(EntityAlias + '.recordStatus', 'recordStatus')
        .innerJoin(EntityAlias + '.changeType', 'changeType')
        .leftJoin(EntityAlias + '.document', 'document')
        .leftJoin(EntityAlias + '.documents', 'documents')
        .leftJoin(EntityAlias + '.documentType', 'documentType')
        .leftJoin('personal.religion', 'religion')
        .leftJoin('personal.updatedPersonalInformations', 'updatedPersonalInformations') // برای مشاهده درجه و یگان نفر
        .leftJoin('updatedPersonalInformations.organ', 'personOrgan')
        .innerJoin('personOrgan.accessedOrgans', 'accessedOrgans') // ارگان هایی که میتوانند اطلاعات این نفر را ببینند
        .leftJoin('previous.order', 'previousOrder')
        .leftJoin('previousOrder.organ', 'previousOrderOrgan')
        .leftJoin('order.organ', 'orderOrgan')
        .addSelect([
                (EntityAlias + '.workflowId'),
                (EntityAlias + '.personalId'),
                (EntityAlias + '.nextId'),
                (EntityAlias + '.previousId'),
                (EntityAlias + '.documentTitle'),
                'personal.id',
                'personal.firstName',
                'personal.lastName',
                'personal.fatherName',
                'personal.nationalNo',
                'personal.personalNo',
                'religion.id',
                'religion.name',
                'documents.id',
                'documents.documentId',
                'documents.documentTitle',
                'documents.documentName',
                'recordStatus.id',
                'recordStatus.name',
                'changeType.id',
                'changeType.name',
                'documentType.id',
                'documentType.name',
                'document.id',
                'document.name',
                'order.id',
                'order.orderNumber',
                'previous.id',
                'previousOrder.id',
                'previousOrder.orderNumber',
                'previousOrderOrgan.id',
                'previousOrderOrgan.title',
                'orderOrgan.id',
                'orderOrgan.title',
                'updatedPersonalInformations.organId',
                'updatedPersonalInformations.educationGradeId',
                'updatedPersonalInformations.educationGradeTitle',
                'updatedPersonalInformations.skillTitle',
                'updatedPersonalInformations.degreeTitle',
                'updatedPersonalInformations.organTitle',
                'updatedPersonalInformations.foreignOrganizationTitle',
            ]
        )
        .andWhere('(accessedOrgans.organId = :userOrganId)', {
            userOrganId: userOrganId,
        })

    return this;
};