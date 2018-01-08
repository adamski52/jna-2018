import "whatwg-fetch";
import {ErrorService} from "./Error.service";

export class HttpService {
    private static _getRequest(url:string, method:string):Request {
        let headers:Headers = new Headers();
        headers.append("Content-Type", "application/json");

        let request:Request = new Request(url, {
            method: method,
            headers: headers
        });

        return request;
    }

    private static _cache:Map<string, any> = new Map<string, any>();

    public static get(url:string, callback:(response:any) => void):void {
        if(HttpService._cache.has(url)) {
            callback(HttpService._cache.get(url));
            return;
        }

        fetch(HttpService._getRequest(url, "GET")).then((response:Response) => {
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

    public static post(url:string, callback:(response:any) => void):void {
        fetch(HttpService._getRequest(url, "POST")).then((response:Response) => {
            if(!response.ok) {
                ErrorService.add(response);
                return;
            }

            response.json().then((json:any) => {
                callback(json);
            }).catch((reason:Error) => {
                ErrorService.add(reason);
            });
        }).catch((reason:Error) => {
            ErrorService.add(reason);
        });
    }
}
