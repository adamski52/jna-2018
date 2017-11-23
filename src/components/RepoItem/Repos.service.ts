import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {IRepo} from "../interfaces/repo";
import {HttpService} from "../HttpService";
import {IUser} from "../interfaces/user";

export class ReposService {
    private static subject:BehaviorSubject<IRepo[]> = new BehaviorSubject([]);

    public static subscribe(callback:(response:IRepo[]) => void):Subscription {
        return this.subject.subscribe(callback);
    }

    public static get():void {
        HttpService.get("/api/users/adamski52/repos", (response:IRepo[]) => {
            this.subject.next(response);
        });
    }
}
