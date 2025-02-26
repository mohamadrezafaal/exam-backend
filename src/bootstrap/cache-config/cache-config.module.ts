import {Module} from "@nestjs/common";
import {CacheModule} from "@nestjs/cache-manager";

@Module({
    imports: [
        CacheModule.register({
            isGlobal:true,
            ttl:parseInt(process.env.CACHE_TTL)
        }),
    ],
})
export class CacheConfigModule {}