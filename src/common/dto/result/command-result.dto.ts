import { ResultDto } from './result.dto';

export class CommandResultDto<T> extends ResultDto {
  data: T;
}
