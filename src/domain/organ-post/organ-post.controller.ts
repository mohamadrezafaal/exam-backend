import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrganPostService } from "./organ-post.service";

@ApiTags('organpost')
  /*@UseGuards(JwtAuthGuard)
    @ApiBearerAuth('sso-auth')*/
  @Controller('organpost')
  export class OrganPostController {
    constructor(private readonly service: OrganPostService) {}
  
      }
  