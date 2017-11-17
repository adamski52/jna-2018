import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {ErrorService} from "../Error.service";

export class PortfolioItemService {
    private static subject:BehaviorSubject<any> = new BehaviorSubject({});

    public static subscribe(callback:(response:any) => void):Subscription {
        return this.subject.subscribe(callback);
    }

    public static get():void {
        fetch("/api/users/adamski52/repos").then((response:Response) => {
            if(response.ok) {
                this.subject.next(response.json());
                return;
            }

            ErrorService.add(response);
        }).catch((reason:Error) => {
            ErrorService.add(reason);
        });
    }
}
