import "whatwg-fetch";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ErrorService} from "./Error.service";

export class HttpService {
    public static get(subject:BehaviorSubject<any>):void {
        fetch("/api/users/adamski52/repos").then((response:Response) => {
            if(response.ok) {
                response.json().then((json:any) => {
                    subject.next(json);
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
