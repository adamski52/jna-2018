import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";

export class ErrorService {
    private static subject:Subject<any> = new Subject();

    public static subscribe(callback:(response:any) => void):Subscription {
        return this.subject.subscribe(callback);
    }

    public static add(response:Error|Response) {
        this.subject.next(response);
    }
}
