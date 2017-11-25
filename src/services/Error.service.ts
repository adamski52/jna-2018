import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";

export class ErrorService {
    private static subject:BehaviorSubject<any> = new BehaviorSubject({});

    public static subscribe(callback:(response:any) => void):Subscription {
        return this.subject.subscribe(callback);
    }

    public static add(response:Error|Response) {
        this.subject.next(response);
    }
}
