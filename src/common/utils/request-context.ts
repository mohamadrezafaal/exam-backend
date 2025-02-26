import * as cls from 'cls-hooked'
import {IncomingMessage} from 'http'


export class RequestContext{
    public static nsid = '6d2cd458-be0f-453e-9ecc-f381042b1eb0';
    public readonly id:number;
    public request:IncomingMessage;
    public response:Response;

    constructor(request:IncomingMessage,response:Response) {
        this.id=Math.random();
        this.request = request;
        this.response = response;
    }
    public static currentRequestContext() : RequestContext{
        const session = cls.getNamespace(RequestContext.nsid);
        if(session && session.active)
            return session.get(RequestContext.name)
        return null
    }

    public static currentRequest(): IncomingMessage{
        let requestContext = RequestContext.currentRequestContext();
        if(requestContext)
            return requestContext.request;
        return null;
    }

    public static currentUser():any{
        let requestContext = RequestContext.currentRequestContext();
        if(requestContext){
            const user:any = requestContext.request['user'];
            if(user)
                return user;
        }
        return null;
    }

}