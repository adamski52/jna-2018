import "whatwg-fetch";
import {ErrorService} from "./Error.service";

export class HttpService {
    private static _cache:Map<string, any> = new Map<string, any>();

    public static get(url:string, callback:(response:any)=>void):void {
        if(HttpService._cache.has(url)) {
            callback(HttpService._cache.get(url));
            return;
        }

        fetch(url).then((response:Response) => {
            if(!response.ok) {
                ErrorService.add(response);
                return;
            }

            response.json().then((json:any) => {
                HttpService._cache.set(url, json);
                callback(json);
            }).catch((reason:Error) => {
                ErrorService.add(reason);
            });
        }).catch((reason:Error) => {
            ErrorService.add(reason);
        });
    }
}
