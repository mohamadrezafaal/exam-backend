import {EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent} from "typeorm";
import {RequestContext} from "@/common/utils/request-context";
import {RemoveEvent} from "typeorm/subscriber/event/RemoveEvent";
import * as fs from 'fs';
import {LogActionTypeEnum} from "@/common/enums/log-action-type.enum";

@EventSubscriber()
export class LogAuditingSubscriber implements EntitySubscriberInterface {

    private auditedEntities: string[] = []

    constructor() {
        this.auditedEntities = fs.readFileSync(process.env.log_audit_entities_file).toString().split(',').map(e => {
            return e.trim()
        });
    }

    async afterInsert(event: InsertEvent<any>): Promise<any> {
        if (await this.shouldInsertLog(event)) {
            let currentUser = RequestContext.currentUser();
            const currentRequest = RequestContext.currentRequest();
            // @ts-ignore
            var ip: string = currentRequest.ip.startsWith('::ffff:')?currentRequest.ip.replace(/^::ffff:/,''):currentRequest.ip;
            return event.manager.query(`EXEC dbo.usp_InsertDataLog @DatabaseName=@0 , @TableName=@1 , @ActionTypeId=@2 , @RequestIp=@3 , @UserId=@4 , @JsonData=@5 , @UpdatedJsonData=@6`,
                [event.connection.options.database, event.metadata.tablePath, LogActionTypeEnum.Insert, ip, currentUser.userSeq, JSON.stringify(event.entity), null])
        }
    }

    async afterRemove(event: RemoveEvent<any>): Promise<any> {
        if (await this.shouldInsertLog(event)) {
            let currentUser = RequestContext.currentUser();
            const currentRequest = RequestContext.currentRequest();
            // @ts-ignore
            const ip: string = currentRequest.ip;
            const finalString = JSON.stringify(event?.databaseEntity ?? (event?.entityId ??null));
            return event.manager.query(`EXEC dbo.usp_InsertDataLog @DatabaseName=@0 , @TableName=@1 , @ActionTypeId=@2 , @RequestIp=@3 , @UserId=@4 , @JsonData=@5 , @UpdatedJsonData=@6`,
                [event.connection.options.database, event.metadata.tablePath, LogActionTypeEnum.Delete, ip, currentUser.userSeq, finalString, null])
        }
    }

    async afterUpdate(event: UpdateEvent<any>): Promise<any> {
        if (await this.shouldInsertLog(event)) {
            let currentUser = RequestContext.currentUser();
            const currentRequest = RequestContext.currentRequest();
            // @ts-ignore
            const ip: string = currentRequest.ip;
            const oldValues = event?.databaseEntity ? JSON.stringify(event?.databaseEntity) : null
            const newValues = event?.entity ? JSON.stringify(event?.entity) : null
            return event.manager.query(`EXEC dbo.usp_InsertDataLog @DatabaseName=@0 , @TableName=@1 , @ActionTypeId=@2 , @RequestIp=@3 , @UserId=@4 , @JsonData=@5 , @UpdatedJsonData=@6`,
                [event.connection.options.database, event.metadata.tablePath, LogActionTypeEnum.Update, ip, currentUser.userSeq, oldValues, newValues])
        }
    }

    async shouldInsertLog(event): Promise<boolean> {
        // return this.auditedEntities.includes(event.metadata.name);
        if (event.metadata.inheritanceTree != null) {
            if (event.metadata.inheritanceTree.length > 0) {
                // طبق بیزینس تعریف شده، اگر entity از نوع داکیومنت بود نیاز نیست لاگ بخورد و باید false برگردد
                // return !event.metadata.inheritanceTree.includes(DocumentBaseEntity);
            }
        }
        return false;
    }

}
