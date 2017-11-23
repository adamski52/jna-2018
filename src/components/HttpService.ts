import "whatwg-fetch";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ErrorService} from "./Error.service";

export class HttpService {
    public static get(url:string, callback:(response:any)=>void):void {
        fetch(url).then((response:Response) => {
            if(response.ok) {
                response.json().then((json:any) => {
                    callback(json);
                }).catch((reason:Error) => {
                    ErrorService.add(reason);
                });
                return;
            }

            ErrorService.add(response);
        }).catch((reason:Error) => {
            ErrorService.add(reason);
        });
    }
}
