import {
  Controller
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrganOperationalService } from './organ-operational.service';
  
  @ApiTags('organoperational')
  /*@UseGuards(JwtAuthGuard)
    @ApiBearerAuth('sso-auth')*/


  // 
  
  // host/organ/organId/organoperational
  @Controller('organoperational')
  export class OrganOperationalController {
    constructor(private readonly service: OrganOperationalService) {}
  
  }
  