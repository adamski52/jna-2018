import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {IRepo} from "../interfaces/Repo.interface";
import {HttpService} from "./Http.service";

export class ReposService {
    private static subject:BehaviorSubject<IRepo[]> = new BehaviorSubject([]);

    public static subscribe(callback:(response:IRepo[]) => void):Subscription {
        return this.subject.subscribe(callback);
    }

    public static get():void {
        HttpService.get("http://www.maintaincomposure.com/git/users/adamski52/repos", (response:IRepo[]) => {
            this.subject.next(response);
        });
    }
}
