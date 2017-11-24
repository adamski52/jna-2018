import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {IRepo} from "../interfaces/repo";
import {HttpService} from "../HttpService";
import {ICommit} from "../interfaces/commit";

export class ReposEventsService {
    private subject:BehaviorSubject<ICommit[]> = new BehaviorSubject([]);

    public subscribe(callback:(response:ICommit[]) => void):Subscription {
        return this.subject.subscribe(callback);
    }

    public get(repo:IRepo):void {
        HttpService.get("/api/repos/adamski52/" + repo.name + "/commits", (response: ICommit[]) => {
            this.subject.next(response);
        });
    }
}
