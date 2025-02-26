export class CreateWorkflowDto {
    systemProcessId: number;
    creatorOrganId?: number;
    comment: string;
    suggestion: string;
    confirmOrganId: number;
    creatorUserId?: number;
    attachmentTitle?: string = null;
    attachmentPath?: string = null;
}