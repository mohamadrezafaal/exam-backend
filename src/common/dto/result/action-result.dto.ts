import { ActionResultMessageDto } from './action-result-message.dto';

export class ActionResultDto {
  statusCode: number;
  message: ActionResultMessageDto[];
  error: string;
}
