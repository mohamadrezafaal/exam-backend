import {CACHE_KEY_METADATA, CacheInterceptor} from "@nestjs/cache-manager";
import {ExecutionContext, Injectable} from "@nestjs/common";

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor
{
    protected cachedRoutes = new Map();

    protected trackBy(context: ExecutionContext): string | undefined {
        const request = context.switchToHttp().getRequest();
        if(!request)
            return undefined

        const { httpAdapter } = this.httpAdapterHost;
        const isHttpApp =httpAdapter && !!httpAdapter.getRequestMethod;
        const cacheMetadata = this.reflector.get(CACHE_KEY_METADATA,context.getHandler())
        const excludePaths :string[] = [
            //Routes to be excluded
            "/workflow",
            "/oauth/client",
            "/file-manager",
            "/payroll"
        ];

        if(!isHttpApp || cacheMetadata)
            return cacheMetadata;

        if(excludePaths.some(path => httpAdapter.getRequestUrl(request).startsWith(path))){
            return undefined;
        }

        const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET'
        if(!isGetRequest){
            setTimeout(async ()=>{
                for (const values of this.cachedRoutes.values()){
                    for (const value of values){
                        await this.cacheManager.del(value);
                    }
                }
            },0);
            return undefined;
        }

        const key = httpAdapter.getRequestUrl(request).split('?')[0]
        if(this.cachedRoutes.has(key) && !this.cachedRoutes.get(key).includes(httpAdapter.getRequestUrl(request))){
            this.cachedRoutes.set(key,[...this.cachedRoutes.get(key),httpAdapter.getRequestUrl(request)]);
            return httpAdapter.getRequestUrl(request);
        }
        this.cachedRoutes.set(key,[httpAdapter.getRequestUrl(request)]);
        return httpAdapter.getRequestUrl(request);
    }

}